# NidApplicationSystem SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'NidApplicationSystem_types'


class NidApplicationSystemSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = NidApplicationSystemUtility.new
    @_utility = utility

    config = NidApplicationSystemConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = NidApplicationSystemHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = NidApplicationSystemHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, NidApplicationSystemFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    NidApplicationSystemUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = NidApplicationSystemHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = NidApplicationSystemHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = NidApplicationSystemHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = NidApplicationSystemSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue NidApplicationSystemError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = NidApplicationSystemHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = NidApplicationSystemHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.application.list / client.application.load({ "id" => ... })
  def application
    require_relative 'entity/application_entity'
    @application ||= ApplicationEntity.new(self, nil)
  end

  # Deprecated: use client.application instead.
  def Application(data = nil)
    require_relative 'entity/application_entity'
    ApplicationEntity.new(self, data)
  end


  # Idiomatic facade: client.application_status.list / client.application_status.load({ "id" => ... })
  def application_status
    require_relative 'entity/application_status_entity'
    @application_status ||= ApplicationStatusEntity.new(self, nil)
  end

  # Deprecated: use client.application_status instead.
  def ApplicationStatus(data = nil)
    require_relative 'entity/application_status_entity'
    ApplicationStatusEntity.new(self, data)
  end


  # Idiomatic facade: client.login.list / client.login.load({ "id" => ... })
  def login
    require_relative 'entity/login_entity'
    @login ||= LoginEntity.new(self, nil)
  end

  # Deprecated: use client.login instead.
  def Login(data = nil)
    require_relative 'entity/login_entity'
    LoginEntity.new(self, data)
  end


  # Idiomatic facade: client.nid_management.list / client.nid_management.load({ "id" => ... })
  def nid_management
    require_relative 'entity/nid_management_entity'
    @nid_management ||= NidManagementEntity.new(self, nil)
  end

  # Deprecated: use client.nid_management instead.
  def NidManagement(data = nil)
    require_relative 'entity/nid_management_entity'
    NidManagementEntity.new(self, data)
  end


  # Idiomatic facade: client.registration.list / client.registration.load({ "id" => ... })
  def registration
    require_relative 'entity/registration_entity'
    @registration ||= RegistrationEntity.new(self, nil)
  end

  # Deprecated: use client.registration instead.
  def Registration(data = nil)
    require_relative 'entity/registration_entity'
    RegistrationEntity.new(self, data)
  end


  # Idiomatic facade: client.success.list / client.success.load({ "id" => ... })
  def success
    require_relative 'entity/success_entity'
    @success ||= SuccessEntity.new(self, nil)
  end

  # Deprecated: use client.success instead.
  def Success(data = nil)
    require_relative 'entity/success_entity'
    SuccessEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = NidApplicationSystemSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end

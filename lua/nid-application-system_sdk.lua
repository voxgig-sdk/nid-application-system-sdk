-- NidApplicationSystem SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local NidApplicationSystemSDK = {}
NidApplicationSystemSDK.__index = NidApplicationSystemSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

NidApplicationSystemSDK._make_feature = _make_feature


function NidApplicationSystemSDK.new(options)
  local self = setmetatable({}, NidApplicationSystemSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function NidApplicationSystemSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function NidApplicationSystemSDK:get_utility()
  return Utility.copy(self._utility)
end


function NidApplicationSystemSDK:get_root_ctx()
  return self._rootctx
end


function NidApplicationSystemSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function NidApplicationSystemSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:application():list() / client:application():load({ id = ... })
function NidApplicationSystemSDK:application(data)
  local EntityMod = require("entity.application_entity")
  if data == nil then
    if self._application == nil then
      self._application = EntityMod.new(self, nil)
    end
    return self._application
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:application() instead.
function NidApplicationSystemSDK:Application(data)
  local EntityMod = require("entity.application_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:application_status():list() / client:application_status():load({ id = ... })
function NidApplicationSystemSDK:application_status(data)
  local EntityMod = require("entity.application_status_entity")
  if data == nil then
    if self._application_status == nil then
      self._application_status = EntityMod.new(self, nil)
    end
    return self._application_status
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:application_status() instead.
function NidApplicationSystemSDK:ApplicationStatus(data)
  local EntityMod = require("entity.application_status_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:login():list() / client:login():load({ id = ... })
function NidApplicationSystemSDK:login(data)
  local EntityMod = require("entity.login_entity")
  if data == nil then
    if self._login == nil then
      self._login = EntityMod.new(self, nil)
    end
    return self._login
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:login() instead.
function NidApplicationSystemSDK:Login(data)
  local EntityMod = require("entity.login_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:nid_management():list() / client:nid_management():load({ id = ... })
function NidApplicationSystemSDK:nid_management(data)
  local EntityMod = require("entity.nid_management_entity")
  if data == nil then
    if self._nid_management == nil then
      self._nid_management = EntityMod.new(self, nil)
    end
    return self._nid_management
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:nid_management() instead.
function NidApplicationSystemSDK:NidManagement(data)
  local EntityMod = require("entity.nid_management_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:registration():list() / client:registration():load({ id = ... })
function NidApplicationSystemSDK:registration(data)
  local EntityMod = require("entity.registration_entity")
  if data == nil then
    if self._registration == nil then
      self._registration = EntityMod.new(self, nil)
    end
    return self._registration
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:registration() instead.
function NidApplicationSystemSDK:Registration(data)
  local EntityMod = require("entity.registration_entity")
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:success():list() / client:success():load({ id = ... })
function NidApplicationSystemSDK:success(data)
  local EntityMod = require("entity.success_entity")
  if data == nil then
    if self._success == nil then
      self._success = EntityMod.new(self, nil)
    end
    return self._success
  end
  return EntityMod.new(self, data)
end

-- Deprecated: use client:success() instead.
function NidApplicationSystemSDK:Success(data)
  local EntityMod = require("entity.success_entity")
  return EntityMod.new(self, data)
end




function NidApplicationSystemSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = NidApplicationSystemSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return NidApplicationSystemSDK

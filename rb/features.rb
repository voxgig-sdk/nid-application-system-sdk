# NidApplicationSystem SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NidApplicationSystemFeatures
  def self.make_feature(name)
    case name
    when "base"
      NidApplicationSystemBaseFeature.new
    when "ratelimit"
      NidApplicationSystemRatelimitFeature.new
    when "retry"
      NidApplicationSystemRetryFeature.new
    when "test"
      NidApplicationSystemTestFeature.new
    when "timeout"
      NidApplicationSystemTimeoutFeature.new
    else
      NidApplicationSystemBaseFeature.new
    end
  end
end

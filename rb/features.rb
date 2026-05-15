# NidApplicationSystem SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NidApplicationSystemFeatures
  def self.make_feature(name)
    case name
    when "base"
      NidApplicationSystemBaseFeature.new
    when "test"
      NidApplicationSystemTestFeature.new
    else
      NidApplicationSystemBaseFeature.new
    end
  end
end

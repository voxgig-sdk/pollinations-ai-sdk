# PollinationsAi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PollinationsAiFeatures
  def self.make_feature(name)
    case name
    when "base"
      PollinationsAiBaseFeature.new
    when "test"
      PollinationsAiTestFeature.new
    else
      PollinationsAiBaseFeature.new
    end
  end
end

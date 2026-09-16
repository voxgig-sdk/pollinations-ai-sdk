# PollinationsAi SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PollinationsAiFeatures
  def self.make_feature(name)
    case name
    when "base"
      PollinationsAiBaseFeature.new
    when "ratelimit"
      PollinationsAiRatelimitFeature.new
    when "retry"
      PollinationsAiRetryFeature.new
    when "test"
      PollinationsAiTestFeature.new
    when "timeout"
      PollinationsAiTimeoutFeature.new
    else
      PollinationsAiBaseFeature.new
    end
  end
end

# PollinationsAi SDK exists test

require "minitest/autorun"
require_relative "../PollinationsAi_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PollinationsAiSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

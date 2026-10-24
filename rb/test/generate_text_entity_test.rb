# GenerateText entity test

require "minitest/autorun"
require "json"
require_relative "../PollinationsAi_sdk"
require_relative "runner"

class GenerateTextEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = PollinationsAiSDK.test(nil, nil)
    ent = testsdk.GenerateText(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = PollinationsAiConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = PollinationsAiSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.GenerateText(nil).create({ "max_tokens" => "x", "messages" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = generate_text_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "generate_text." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    generate_text_ref01_ent = client.GenerateText(nil)
    generate_text_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.generate_text"), "generate_text_ref01"))

    generate_text_ref01_data_result = generate_text_ref01_ent.create(generate_text_ref01_data, nil)
    generate_text_ref01_data = Helpers.to_map(generate_text_ref01_data_result.respond_to?(:data_get) ? generate_text_ref01_data_result.data_get : generate_text_ref01_data_result)
    assert !generate_text_ref01_data.nil?
    assert !generate_text_ref01_data["id"].nil?

  end
end

def generate_text_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "generate_text", "GenerateTextTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PollinationsAiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["generate_text01", "generate_text02", "generate_text03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID" => idmap,
    "POLLINATIONS_AI_TEST_LIVE" => "FALSE",
    "POLLINATIONS_AI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["POLLINATIONS_AI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = PollinationsAiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["POLLINATIONS_AI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["POLLINATIONS_AI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

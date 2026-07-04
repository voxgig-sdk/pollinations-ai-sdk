# GenerateText entity test

require "minitest/autorun"
require "json"
require_relative "../PollinationsAi_sdk"
require_relative "runner"

class GenerateTextEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PollinationsAiSDK.test(nil, nil)
    ent = testsdk.GenerateText(nil)
    assert !ent.nil?
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    generate_text_ref01_ent = client.GenerateText(nil)
    generate_text_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.generate_text"), "generate_text_ref01"))

    generate_text_ref01_data_result = generate_text_ref01_ent.create(generate_text_ref01_data, nil)
    generate_text_ref01_data = Helpers.to_map(generate_text_ref01_data_result)
    assert !generate_text_ref01_data.nil?
    assert !generate_text_ref01_data["id"].nil?

  end
end

def generate_text_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "generate_text", "GenerateTextTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID" => idmap,
    "POLLINATIONSAI_TEST_LIVE" => "FALSE",
    "POLLINATIONSAI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["POLLINATIONSAI_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = PollinationsAiSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["POLLINATIONSAI_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["POLLINATIONSAI_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

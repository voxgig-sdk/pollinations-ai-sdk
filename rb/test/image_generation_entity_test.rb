# ImageGeneration entity test

require "minitest/autorun"
require "json"
require_relative "../PollinationsAi_sdk"
require_relative "runner"

class ImageGenerationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PollinationsAiSDK.test(nil, nil)
    ent = testsdk.ImageGeneration(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = image_generation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "image_generation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set POLLINATIONSAI_TEST_IMAGE_GENERATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    image_generation_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.image_generation")))
    image_generation_ref01_data = nil
    if image_generation_ref01_data_raw.length > 0
      image_generation_ref01_data = Helpers.to_map(image_generation_ref01_data_raw[0][1])
    end

    # LOAD
    image_generation_ref01_ent = client.ImageGeneration(nil)
    image_generation_ref01_match_dt0 = {}
    image_generation_ref01_data_dt0_loaded = image_generation_ref01_ent.load(image_generation_ref01_match_dt0, nil)
    assert !image_generation_ref01_data_dt0_loaded.nil?

  end
end

def image_generation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "image_generation", "ImageGenerationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PollinationsAiSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["image_generation01", "image_generation02", "image_generation03", "prompt01", "prompt02", "prompt03"],
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
  entid_env_raw = ENV["POLLINATIONSAI_TEST_IMAGE_GENERATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "POLLINATIONSAI_TEST_IMAGE_GENERATION_ENTID" => idmap,
    "POLLINATIONSAI_TEST_LIVE" => "FALSE",
    "POLLINATIONSAI_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["POLLINATIONSAI_TEST_IMAGE_GENERATION_ENTID"])
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

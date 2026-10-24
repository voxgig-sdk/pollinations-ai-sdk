<?php
declare(strict_types=1);

// GenerateText entity test

require_once __DIR__ . '/../pollinationsai_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GenerateTextEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = PollinationsAiSDK::test(null, null);
        $ent = $testsdk->GenerateText(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = PollinationsAiConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = PollinationsAiSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->GenerateText(null)->create(["max_tokens" => 'x', "messages" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = generate_text_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "generate_text." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];

        // CREATE
        $generate_text_ref01_ent = $client->GenerateText(null);
        $generate_text_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.generate_text"), "generate_text_ref01"));

        $generate_text_ref01_data_result = $generate_text_ref01_ent->create($generate_text_ref01_data, null);
        $generate_text_ref01_data = Helpers::to_map(is_object($generate_text_ref01_data_result) && method_exists($generate_text_ref01_data_result, 'data_get') ? $generate_text_ref01_data_result->data_get() : $generate_text_ref01_data_result);
        $this->assertNotNull($generate_text_ref01_data);
        $this->assertNotNull($generate_text_ref01_data["id"]);

    }
}

function generate_text_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/generate_text/GenerateTextTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PollinationsAiSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["generate_text01", "generate_text02", "generate_text03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID" => $idmap,
        "POLLINATIONS_AI_TEST_LIVE" => "FALSE",
        "POLLINATIONS_AI_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["POLLINATIONS_AI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new PollinationsAiSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["POLLINATIONS_AI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["POLLINATIONS_AI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}

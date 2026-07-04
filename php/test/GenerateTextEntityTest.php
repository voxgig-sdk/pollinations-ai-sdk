<?php
declare(strict_types=1);

// GenerateText entity test

require_once __DIR__ . '/../pollinationsai_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GenerateTextEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PollinationsAiSDK::test(null, null);
        $ent = $testsdk->GenerateText(null);
        $this->assertNotNull($ent);
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
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $generate_text_ref01_ent = $client->GenerateText(null);
        $generate_text_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.generate_text"), "generate_text_ref01"));

        $generate_text_ref01_data_result = $generate_text_ref01_ent->create($generate_text_ref01_data, null);
        $generate_text_ref01_data = Helpers::to_map($generate_text_ref01_data_result);
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

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID" => $idmap,
        "POLLINATIONSAI_TEST_LIVE" => "FALSE",
        "POLLINATIONSAI_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["POLLINATIONSAI_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PollinationsAiSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["POLLINATIONSAI_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["POLLINATIONSAI_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}

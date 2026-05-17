package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/pollinations-ai-sdk/go"
	"github.com/voxgig-sdk/pollinations-ai-sdk/go/core"

	vs "github.com/voxgig-sdk/pollinations-ai-sdk/go/utility/struct"
)

func TestGenerateTextEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GenerateText(nil)
		if ent == nil {
			t.Fatal("expected non-nil GenerateTextEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := generate_textBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "generate_text." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		generateTextRef01Ent := client.GenerateText(nil)
		generateTextRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "generate_text"}, setup.data), "generate_text_ref01"))

		generateTextRef01DataResult, err := generateTextRef01Ent.Create(generateTextRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		generateTextRef01Data = core.ToMapAny(generateTextRef01DataResult)
		if generateTextRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if generateTextRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

	})
}

func generate_textBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "generate_text", "GenerateTextTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read generate_text test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse generate_text test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"generate_text01", "generate_text02", "generate_text03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID": idmap,
		"POLLINATIONSAI_TEST_LIVE":      "FALSE",
		"POLLINATIONSAI_TEST_EXPLAIN":   "FALSE",
		"POLLINATIONSAI_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["POLLINATIONSAI_TEST_GENERATE_TEXT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["POLLINATIONSAI_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["POLLINATIONSAI_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPollinationsAiSDK(core.ToMapAny(mergedOpts))
	}

	live := env["POLLINATIONSAI_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["POLLINATIONSAI_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

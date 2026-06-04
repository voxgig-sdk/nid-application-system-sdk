package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/nid-application-system-sdk/go"
	"github.com/voxgig-sdk/nid-application-system-sdk/go/core"

	vs "github.com/voxgig-sdk/nid-application-system-sdk/go/utility/struct"
)

func TestApplicationStatusEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ApplicationStatus(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApplicationStatusEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := application_statusBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "application_status." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set NIDAPPLICATIONSYSTEM_TEST_APPLICATION_STATUS_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		applicationStatusRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.application_status", setup.data)))
		var applicationStatusRef01Data map[string]any
		if len(applicationStatusRef01DataRaw) > 0 {
			applicationStatusRef01Data = core.ToMapAny(applicationStatusRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = applicationStatusRef01Data

		// LOAD
		applicationStatusRef01Ent := client.ApplicationStatus(nil)
		applicationStatusRef01MatchDt0 := map[string]any{}
		applicationStatusRef01DataDt0Loaded, err := applicationStatusRef01Ent.Load(applicationStatusRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if applicationStatusRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func application_statusBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "application_status", "ApplicationStatusTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read application_status test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse application_status test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"application_status01", "application_status02", "application_status03"},
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
	entidEnvRaw := os.Getenv("NIDAPPLICATIONSYSTEM_TEST_APPLICATION_STATUS_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NIDAPPLICATIONSYSTEM_TEST_APPLICATION_STATUS_ENTID": idmap,
		"NIDAPPLICATIONSYSTEM_TEST_LIVE":      "FALSE",
		"NIDAPPLICATIONSYSTEM_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["NIDAPPLICATIONSYSTEM_TEST_APPLICATION_STATUS_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NIDAPPLICATIONSYSTEM_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewNidApplicationSystemSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NIDAPPLICATIONSYSTEM_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NIDAPPLICATIONSYSTEM_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

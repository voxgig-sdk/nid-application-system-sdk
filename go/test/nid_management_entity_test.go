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

func TestNidManagementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.NidManagement(nil)
		if ent == nil {
			t.Fatal("expected non-nil NidManagementEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := nid_managementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "nid_management." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set NIDAPPLICATIONSYSTEM_TEST_NID_MANAGEMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		nidManagementRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.nid_management", setup.data)))
		var nidManagementRef01Data map[string]any
		if len(nidManagementRef01DataRaw) > 0 {
			nidManagementRef01Data = core.ToMapAny(nidManagementRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = nidManagementRef01Data

		// LOAD
		nidManagementRef01Ent := client.NidManagement(nil)
		nidManagementRef01MatchDt0 := map[string]any{}
		nidManagementRef01DataDt0Loaded, err := nidManagementRef01Ent.Load(nidManagementRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if nidManagementRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func nid_managementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "nid_management", "NidManagementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read nid_management test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse nid_management test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"nid_management01", "nid_management02", "nid_management03"},
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
	entidEnvRaw := os.Getenv("NIDAPPLICATIONSYSTEM_TEST_NID_MANAGEMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NIDAPPLICATIONSYSTEM_TEST_NID_MANAGEMENT_ENTID": idmap,
		"NIDAPPLICATIONSYSTEM_TEST_LIVE":      "FALSE",
		"NIDAPPLICATIONSYSTEM_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["NIDAPPLICATIONSYSTEM_TEST_NID_MANAGEMENT_ENTID"])
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

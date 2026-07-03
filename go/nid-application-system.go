package voxgignidapplicationsystemsdk

import (
	"github.com/voxgig-sdk/nid-application-system-sdk/go/core"
	"github.com/voxgig-sdk/nid-application-system-sdk/go/entity"
	"github.com/voxgig-sdk/nid-application-system-sdk/go/feature"
	_ "github.com/voxgig-sdk/nid-application-system-sdk/go/utility"
)

// Type aliases preserve external API.
type NidApplicationSystemSDK = core.NidApplicationSystemSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NidApplicationSystemEntity = core.NidApplicationSystemEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NidApplicationSystemError = core.NidApplicationSystemError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApplicationEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewApplicationEntity(client, entopts)
	}
	core.NewApplicationStatusEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewApplicationStatusEntity(client, entopts)
	}
	core.NewLoginEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewLoginEntity(client, entopts)
	}
	core.NewNidManagementEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewNidManagementEntity(client, entopts)
	}
	core.NewRegistrationEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewRegistrationEntity(client, entopts)
	}
	core.NewSuccessEntityFunc = func(client *core.NidApplicationSystemSDK, entopts map[string]any) core.NidApplicationSystemEntity {
		return entity.NewSuccessEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNidApplicationSystemSDK = core.NewNidApplicationSystemSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewNidApplicationSystemSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *NidApplicationSystemSDK  { return NewNidApplicationSystemSDK(nil) }
func Test() *NidApplicationSystemSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

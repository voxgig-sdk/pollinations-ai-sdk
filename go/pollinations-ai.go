package voxgigpollinationsaisdk

import (
	"github.com/voxgig-sdk/pollinations-ai-sdk/go/core"
	"github.com/voxgig-sdk/pollinations-ai-sdk/go/entity"
	"github.com/voxgig-sdk/pollinations-ai-sdk/go/feature"
	_ "github.com/voxgig-sdk/pollinations-ai-sdk/go/utility"
)

// Type aliases preserve external API.
type PollinationsAiSDK = core.PollinationsAiSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PollinationsAiEntity = core.PollinationsAiEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PollinationsAiError = core.PollinationsAiError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGenerateTextEntityFunc = func(client *core.PollinationsAiSDK, entopts map[string]any) core.PollinationsAiEntity {
		return entity.NewGenerateTextEntity(client, entopts)
	}
	core.NewImageGenerationEntityFunc = func(client *core.PollinationsAiSDK, entopts map[string]any) core.PollinationsAiEntity {
		return entity.NewImageGenerationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPollinationsAiSDK = core.NewPollinationsAiSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature

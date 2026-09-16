package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGenerateTextEntityFunc func(client *PollinationsAiSDK, entopts map[string]any) PollinationsAiEntity

var NewImageGenerationEntityFunc func(client *PollinationsAiSDK, entopts map[string]any) PollinationsAiEntity


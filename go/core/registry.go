package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGenerateTextEntityFunc func(client *PollinationsAiSDK, entopts map[string]any) PollinationsAiEntity

var NewImageGenerationEntityFunc func(client *PollinationsAiSDK, entopts map[string]any) PollinationsAiEntity


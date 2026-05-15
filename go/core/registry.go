package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewApplicationEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity

var NewApplicationStatusEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity

var NewLoginEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity

var NewNidManagementEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity

var NewRegistrationEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity

var NewSuccessEntityFunc func(client *NidApplicationSystemSDK, entopts map[string]any) NidApplicationSystemEntity


package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PollinationsAi",
			"slug": "pollinations-ai",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://image.pollinations.ai",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"generate_text": map[string]any{},
				"image_generation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"generate_text": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "choices",
						"title": "Choices",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$INTEGER`",
						"short": "Unix timestamp of when the generation was created",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique identifier for the generation",
					},
					map[string]any{
						"name": "max_tokens",
						"title": "Max Tokens",
						"type": "`$INTEGER`",
						"short": "Maximum number of tokens to generate",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Array of message objects for the conversation",
					},
					map[string]any{
						"name": "model",
						"title": "Model",
						"type": "`$STRING`",
						"short": "The model used for generation",
					},
					map[string]any{
						"name": "object",
						"title": "Object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "seed",
						"title": "Seed",
						"type": "`$INTEGER`",
						"short": "Seed for reproducible text generation",
					},
					map[string]any{
						"name": "temperature",
						"title": "Temperature",
						"type": "`$NUMBER`",
						"short": "Controls randomness in generation (0.0 to 2.0)",
					},
					map[string]any{
						"name": "usage",
						"title": "Usage",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "generate_text",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/",
								"segments": []any{},
								"parts": []any{},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"image_generation": map[string]any{
				"fields": []any{},
				"name": "image_generation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/prompt/{prompt}",
								"segments": []any{
									map[string]any{
										"lit": "prompt",
									},
									map[string]any{
										"var": "prompt",
									},
								},
								"parts": []any{
									"prompt",
									"{prompt}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "prompt",
											"orig": "prompt",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "A beautiful sunset over mountains",
										},
									},
									"query": []any{
										map[string]any{
											"name": "enhance",
											"orig": "enhance",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1024,
										},
										map[string]any{
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
											"kind": "query",
											"example": "flux",
										},
										map[string]any{
											"name": "nologo",
											"orig": "nologo",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "seed",
											"orig": "seed",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1024,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"prompt",
									},
								},
								"response": map[string]any{
									"alternatives": []any{
										map[string]any{
											"binary": true,
											"kind": "raw",
											"media": "image/png",
										},
									},
									"binary": true,
									"kind": "raw",
									"media": "image/jpeg",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

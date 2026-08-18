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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_tokens",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "messages",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "model",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "object",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "seed",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "temperature",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "usage",
						"type": "`$OBJECT`",
					},
				},
				"name": "generate_text",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "A beautiful sunset over mountains",
											"kind": "param",
											"name": "prompt",
											"orig": "prompt",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "enhance",
											"orig": "enhance",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1024,
											"kind": "query",
											"name": "height",
											"orig": "height",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "flux",
											"kind": "query",
											"name": "model",
											"orig": "model",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "nologo",
											"orig": "nologo",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "seed",
											"orig": "seed",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 1024,
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/prompt/{prompt}",
								"parts": []any{
									"prompt",
									"{prompt}",
								},
								"select": map[string]any{
									"exist": []any{
										"enhance",
										"height",
										"model",
										"nologo",
										"prompt",
										"seed",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"prompt",
						},
					},
				},
			},
		},
	}
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

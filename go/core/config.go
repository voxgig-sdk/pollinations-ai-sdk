package core

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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"name": "choice",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "created",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "id",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "max_token",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "message",
						"req": true,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
					map[string]any{
						"name": "model",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 5,
					},
					map[string]any{
						"name": "object",
						"req": false,
						"type": "`$STRING`",
						"active": true,
						"index$": 6,
					},
					map[string]any{
						"name": "seed",
						"req": false,
						"type": "`$INTEGER`",
						"active": true,
						"index$": 7,
					},
					map[string]any{
						"name": "temperature",
						"req": false,
						"type": "`$NUMBER`",
						"active": true,
						"index$": 8,
					},
					map[string]any{
						"name": "usage",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 9,
					},
				},
				"name": "generate_text",
				"op": map[string]any{
					"create": map[string]any{
						"name": "create",
						"points": []any{
							map[string]any{
								"method": "POST",
								"orig": "/",
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"parts": []any{},
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "create",
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
											"active": true,
										},
									},
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "enhance",
											"orig": "enhance",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"example": 1024,
											"kind": "query",
											"name": "height",
											"orig": "height",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "flux",
											"kind": "query",
											"name": "model",
											"orig": "model",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "nologo",
											"orig": "nologo",
											"reqd": false,
											"type": "`$BOOLEAN`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "seed",
											"orig": "seed",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": 1024,
											"kind": "query",
											"name": "width",
											"orig": "width",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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

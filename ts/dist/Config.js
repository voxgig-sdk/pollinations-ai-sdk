"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'PollinationsAi',
        slug: "pollinations-ai",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://image.pollinations.ai",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            generate_text: {},
            image_generation: {},
        }
    };
    entity = {
        "generate_text": {
            "fields": [
                {
                    "name": "choices",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "created",
                    "short": "Unix timestamp of when the generation was created",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "id",
                    "short": "Unique identifier for the generation",
                    "type": "`$STRING`"
                },
                {
                    "name": "max_tokens",
                    "short": "Maximum number of tokens to generate",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "messages",
                    "req": true,
                    "short": "Array of message objects for the conversation",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "model",
                    "short": "The model used for generation",
                    "type": "`$STRING`"
                },
                {
                    "name": "object",
                    "type": "`$STRING`"
                },
                {
                    "name": "seed",
                    "short": "Seed for reproducible text generation",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "temperature",
                    "short": "Controls randomness in generation (0.0 to 2.0)",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "usage",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "generate_text",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/",
                            "segments": [],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": []
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "image_generation": {
            "fields": [],
            "name": "image_generation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "A beautiful sunset over mountains",
                                        "kind": "param",
                                        "name": "prompt",
                                        "orig": "prompt",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "enhance",
                                        "orig": "enhance",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": 1024,
                                        "kind": "query",
                                        "name": "height",
                                        "orig": "height",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "flux",
                                        "kind": "query",
                                        "name": "model",
                                        "orig": "model",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "nologo",
                                        "orig": "nologo",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "seed",
                                        "orig": "seed",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": 1024,
                                        "kind": "query",
                                        "name": "width",
                                        "orig": "width",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/prompt/{prompt}",
                            "segments": [
                                {
                                    "lit": "prompt"
                                },
                                {
                                    "var": "prompt"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "enhance",
                                    "height",
                                    "model",
                                    "nologo",
                                    "prompt",
                                    "seed",
                                    "width"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "prompt",
                                "{prompt}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "prompt"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map
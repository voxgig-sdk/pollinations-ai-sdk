"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "generate_text",
        "accessor": "GenerateText",
        "op": "create",
        "method": "POST",
        "path": "/",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "x",
            "object": "chat.completion",
            "created": 1,
            "model": "x",
            "choices": [
                {
                    "index": 1,
                    "message": {
                        "role": "system",
                        "content": "x"
                    },
                    "finish_reason": "stop"
                }
            ],
            "usage": {
                "prompt_tokens": 1,
                "completion_tokens": 1,
                "total_tokens": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "image_generation",
        "accessor": "ImageGeneration",
        "op": "load",
        "method": "GET",
        "path": "/prompt/{prompt}",
        "args": [
            {
                "name": "prompt",
                "wire": "prompt",
                "value": "A beautiful sunset over mountains"
            }
        ],
        "select": {
            "enhance": "v1",
            "height": 1024,
            "model": "flux",
            "nologo": "v1",
            "seed": "v1",
            "width": 1024
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "image/png",
            "image/jpeg"
        ],
        "query": [
            "width",
            "height",
            "seed",
            "model",
            "nologo",
            "enhance"
        ],
        "queryArgs": [
            {
                "name": "enhance",
                "wire": "enhance"
            },
            {
                "name": "height",
                "wire": "height"
            },
            {
                "name": "model",
                "wire": "model"
            },
            {
                "name": "nologo",
                "wire": "nologo"
            },
            {
                "name": "seed",
                "wire": "seed"
            },
            {
                "name": "width",
                "wire": "width"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map
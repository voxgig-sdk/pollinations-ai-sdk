"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ImageGenerationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when POLLINATIONS_AI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('POLLINATIONS_AI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PollinationsAiSDK.test();
        const ent = testsdk.ImageGeneration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.POLLINATIONS_AI_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image_generation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "image_generation", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "A beautiful sunset over mountains", "kind": "param", "name": "prompt", "orig": "prompt", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": false, "kind": "query", "name": "enhance", "orig": "enhance", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "example": 1024, "kind": "query", "name": "height", "orig": "height", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "flux", "kind": "query", "name": "model", "orig": "model", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": false, "kind": "query", "name": "nologo", "orig": "nologo", "reqd": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "kind": "query", "name": "seed", "orig": "seed", "reqd": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "example": 1024, "kind": "query", "name": "width", "orig": "width", "reqd": false, "type": "`$INTEGER`", "index$": 5 }] }, "contract": { "id": "GET /prompt/{prompt}", "json": "{\"operationId\":\"generateImage\",\"parameters\":[{\"description\":\"The text prompt describing the image to generate\",\"example\":\"A beautiful sunset over mountains\",\"in\":\"path\",\"name\":\"prompt\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Width of the generated image in pixels\",\"in\":\"query\",\"name\":\"width\",\"required\":false,\"schema\":{\"default\":1024,\"maximum\":2048,\"minimum\":128,\"type\":\"integer\"}},{\"description\":\"Height of the generated image in pixels\",\"in\":\"query\",\"name\":\"height\",\"required\":false,\"schema\":{\"default\":1024,\"maximum\":2048,\"minimum\":128,\"type\":\"integer\"}},{\"description\":\"Seed for reproducible image generation\",\"in\":\"query\",\"name\":\"seed\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The AI model to use for generation\",\"in\":\"query\",\"name\":\"model\",\"required\":false,\"schema\":{\"default\":\"flux\",\"type\":\"string\"}},{\"description\":\"Remove Pollinations logo from the generated image\",\"in\":\"query\",\"name\":\"nologo\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}},{\"description\":\"Enhance the prompt automatically\",\"in\":\"query\",\"name\":\"enhance\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/jpeg\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"Successfully generated image\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error during image generation\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/prompt/{prompt}", "segments": [{ "lit": "prompt" }, { "var": "prompt" }], "select": { "exist": ["enhance", "height", "model", "nologo", "prompt", "seed", "width"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["prompt"]] }, "key$": "image_generation", "name__orig": "image_generation", "Name": "ImageGeneration", "name_": "image_generation", "name-": "image-generation", "NAME": "IMAGE_GENERATION", "index$": 1 }, { "active": true, "entity": "image_generation", "key$": "BasicImageGenerationFlow", "kind": "basic", "name": "BasicImageGenerationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "image_generation_ref01", "srcdatavar": "image_generation_ref01_data", "suffix": "_dt0" }, "match": { "id": "image_generation01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-image_generation_ref01" } }], "index$": 0 }] }, 'ImageGeneration');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_generation_ref01_data = Object.values(setup.data.existing.image_generation)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const image_generation_ref01_ent = client.ImageGeneration();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image_generation/ImageGenerationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PollinationsAiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image_generation01', 'image_generation02', 'image_generation03', 'prompt01', 'prompt02', 'prompt03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'POLLINATIONS_AI_TEST_IMAGE_GENERATION_ENTID': idmap,
        'POLLINATIONS_AI_TEST_LIVE': 'FALSE',
        'POLLINATIONS_AI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['POLLINATIONS_AI_TEST_IMAGE_GENERATION_ENTID'];
    const live = 'TRUE' === env.POLLINATIONS_AI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['POLLINATIONS_AI_TEST_IMAGE_GENERATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PollinationsAiSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.POLLINATIONS_AI_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ImageGenerationEntity.test.js.map
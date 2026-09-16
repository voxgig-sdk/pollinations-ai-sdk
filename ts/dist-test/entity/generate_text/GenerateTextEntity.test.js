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
(0, node_test_1.describe)('GenerateTextEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when POLLINATIONS_AI_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('POLLINATIONS_AI_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PollinationsAiSDK.test();
        const ent = testsdk.GenerateText();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.POLLINATIONS_AI_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'generate_text.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "choices", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "created", "req": false, "short": "Unix timestamp of when the generation was created", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the generation", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "max_tokens", "req": false, "short": "Maximum number of tokens to generate", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "messages", "req": true, "short": "Array of message objects for the conversation", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "model", "req": false, "short": "The model used for generation", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "object", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "seed", "req": false, "short": "Seed for reproducible text generation", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "temperature", "req": false, "short": "Controls randomness in generation (0.0 to 2.0)", "type": "`$NUMBER`", "index$": 8 }, { "active": true, "name": "usage", "req": false, "type": "`$OBJECT`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "generate_text", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /", "json": "{\"operationId\":\"generateText\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"messages\":[{\"content\":\"Write a short poem about artificial intelligence\",\"role\":\"user\"}],\"model\":\"openai\",\"seed\":42,\"temperature\":0.7},\"schema\":{\"properties\":{\"max_tokens\":{\"description\":\"Maximum number of tokens to generate\",\"maximum\":4096,\"minimum\":1,\"type\":\"integer\"},\"messages\":{\"description\":\"Array of message objects for the conversation\",\"items\":{\"properties\":{\"content\":{\"description\":\"The content of the message\",\"type\":\"string\"},\"role\":{\"description\":\"The role of the message sender\",\"enum\":[\"system\",\"user\",\"assistant\"],\"type\":\"string\"}},\"required\":[\"role\",\"content\"],\"type\":\"object\"},\"type\":\"array\"},\"model\":{\"default\":\"openai\",\"description\":\"The language model to use for text generation\",\"enum\":[\"openai\",\"mistral\",\"claude\"],\"type\":\"string\"},\"seed\":{\"description\":\"Seed for reproducible text generation\",\"type\":\"integer\"},\"temperature\":{\"default\":1,\"description\":\"Controls randomness in generation (0.0 to 2.0)\",\"maximum\":2,\"minimum\":0,\"type\":\"number\"}},\"required\":[\"messages\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"choices\":{\"items\":{\"properties\":{\"finish_reason\":{\"enum\":[\"stop\",\"length\",\"content_filter\"],\"type\":\"string\"},\"index\":{\"type\":\"integer\"},\"message\":{\"properties\":{\"content\":{\"description\":\"The content of the message\",\"type\":\"string\"},\"role\":{\"description\":\"The role of the message sender\",\"enum\":[\"system\",\"user\",\"assistant\"],\"type\":\"string\"}},\"required\":[\"role\",\"content\"],\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"created\":{\"description\":\"Unix timestamp of when the generation was created\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the generation\",\"type\":\"string\"},\"model\":{\"description\":\"The model used for generation\",\"type\":\"string\"},\"object\":{\"example\":\"chat.completion\",\"type\":\"string\"},\"usage\":{\"properties\":{\"completion_tokens\":{\"description\":\"Number of tokens in the completion\",\"type\":\"integer\"},\"prompt_tokens\":{\"description\":\"Number of tokens in the prompt\",\"type\":\"integer\"},\"total_tokens\":{\"description\":\"Total number of tokens used\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated text response\",\"headers\":{\"Content-Type\":{\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters or prompt\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error during text generation\"}},\"security\":[],\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/", "segments": [], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "generate_text", "name__orig": "generate_text", "Name": "GenerateText", "name_": "generate_text", "name-": "generate-text", "NAME": "GENERATE_TEXT", "index$": 0 }, { "active": true, "entity": "generate_text", "key$": "BasicGenerateTextFlow", "kind": "basic", "name": "BasicGenerateTextFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "generate_text_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'GenerateText');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const generate_text_ref01_ent = client.GenerateText();
        let generate_text_ref01_data = setup.data.new.generate_text['generate_text_ref01'];
        generate_text_ref01_data = (await generate_text_ref01_ent.create(generate_text_ref01_data)).data();
        (0, node_assert_1.default)(null != generate_text_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/generate_text/GenerateTextTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PollinationsAiSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['generate_text01', 'generate_text02', 'generate_text03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID': idmap,
        'POLLINATIONS_AI_TEST_LIVE': 'FALSE',
        'POLLINATIONS_AI_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID'];
    const live = 'TRUE' === env.POLLINATIONS_AI_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID'];
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
//# sourceMappingURL=GenerateTextEntity.test.js.map
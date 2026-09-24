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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "choices": { "a": true, "h": "Choices", "n": "choices", "r": false, "t": "`$ARRAY`", "key$": "choices", "index$": 0 }, "created": { "a": true, "h": "Created", "n": "created", "r": false, "sh": "Unix timestamp of when the generation was created", "t": "`$INTEGER`", "key$": "created", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the generation", "t": "`$STRING`", "key$": "id", "index$": 2 }, "max_tokens": { "a": true, "h": "Max Tokens", "n": "max_tokens", "r": false, "sh": "Maximum number of tokens to generate", "t": "`$INTEGER`", "key$": "max_tokens", "index$": 3 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": true, "sh": "Array of message objects for the conversation", "t": "`$ARRAY`", "key$": "messages", "index$": 4 }, "model": { "a": true, "h": "Model", "n": "model", "r": false, "sh": "The model used for generation", "t": "`$STRING`", "key$": "model", "index$": 5 }, "object": { "a": true, "h": "Object", "n": "object", "r": false, "t": "`$STRING`", "key$": "object", "index$": 6 }, "seed": { "a": true, "h": "Seed", "n": "seed", "r": false, "sh": "Seed for reproducible text generation", "t": "`$INTEGER`", "key$": "seed", "index$": 7 }, "temperature": { "a": true, "h": "Temperature", "n": "temperature", "r": false, "sh": "Controls randomness in generation (0.0 to 2.0)", "t": "`$NUMBER`", "key$": "temperature", "index$": 8 }, "usage": { "a": true, "h": "Usage", "n": "usage", "r": false, "t": "`$OBJECT`", "key$": "usage", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "generate_text", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/", "q": {}, "r": {}, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "generate_text", "name__orig": "generate_text", "Name": "GenerateText", "name_": "generate_text", "name-": "generate-text", "NAME": "GENERATE_TEXT", "index$": 0 }, { "active": true, "entity": "generate_text", "key$": "BasicGenerateTextFlow", "kind": "basic", "name": "BasicGenerateTextFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "generate_text_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'GenerateText', { "POST /": { "protocol": "http", "operationId": "generateText", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["messages"], "properties": { "messages": { "type": "array", "description": "Array of message objects for the conversation", "items": { "type": "object", "required": ["role", "content"], "properties": { "role": { "type": "string", "description": "The role of the message sender", "enum": ["system", "user", "assistant"] }, "content": { "type": "string", "description": "The content of the message" } }, "x-ref": "#/components/schemas/Message" }, "key$": "messages" }, "model": { "type": "string", "description": "The language model to use for text generation", "default": "openai", "enum": ["openai", "mistral", "claude"], "key$": "model" }, "seed": { "type": "integer", "description": "Seed for reproducible text generation", "key$": "seed" }, "temperature": { "type": "number", "description": "Controls randomness in generation (0.0 to 2.0)", "minimum": 0, "maximum": 2, "default": 1, "key$": "temperature" }, "max_tokens": { "type": "integer", "description": "Maximum number of tokens to generate", "minimum": 1, "maximum": 4096, "key$": "max_tokens" } }, "x-ref": "#/components/schemas/TextGenerationRequest", "index$": 1 }, "example": { "messages": [{ "role": "user", "content": "Write a short poem about artificial intelligence" }], "model": "openai", "seed": 42, "temperature": 0.7 } } } }, "responses": { "200": { "description": "Successfully generated text response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "string", "description": "Unique identifier for the generation", "key$": "id" }, "object": { "type": "string", "example": "chat.completion", "key$": "object" }, "created": { "type": "integer", "description": "Unix timestamp of when the generation was created", "key$": "created" }, "model": { "type": "string", "description": "The model used for generation", "key$": "model" }, "choices": { "type": "array", "items": { "type": "object", "properties": { "index": { "type": "integer" }, "message": { "type": "object", "required": ["role", "content"], "properties": { "role": { "type": "string", "description": "The role of the message sender", "enum": ["system", "user", "assistant"] }, "content": { "type": "string", "description": "The content of the message" } }, "x-ref": "#/components/schemas/Message" }, "finish_reason": { "type": "string", "enum": ["stop", "length", "content_filter"] } }, "x-ref": "#/components/schemas/Choice" }, "key$": "choices" }, "usage": { "type": "object", "properties": { "prompt_tokens": { "type": "integer", "description": "Number of tokens in the prompt" }, "completion_tokens": { "type": "integer", "description": "Number of tokens in the completion" }, "total_tokens": { "type": "integer", "description": "Total number of tokens used" } }, "x-ref": "#/components/schemas/Usage", "key$": "usage" } }, "x-ref": "#/components/schemas/TextGenerationResponse", "index$": 0 } } }, "headers": { "Content-Type": { "schema": { "type": "string", "example": "application/json" } } } }, "400": { "description": "Bad request - invalid parameters or prompt", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message describing what went wrong" }, "type": { "type": "string", "description": "Type of error" }, "code": { "type": "string", "description": "Error code" } } } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error during text generation", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "object", "properties": { "message": { "type": "string", "description": "Error message describing what went wrong" }, "type": { "type": "string", "description": "Type of error" }, "code": { "type": "string", "description": "Error code" } } } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [], "securitySource": "definition" } });
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


import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PollinationsAiSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GenerateTextEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when POLLINATIONS_AI_TEST_LIVE=TRUE.
  afterEach(liveDelay('POLLINATIONS_AI_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PollinationsAiSDK.test()
    const ent = testsdk.GenerateText()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.POLLINATIONS_AI_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'generate_text.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"choices","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"created","req":false,"short":"Unix timestamp of when the generation was created","type":"`$INTEGER`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the generation","type":"`$STRING`","index$":2},{"active":true,"name":"max_tokens","req":false,"short":"Maximum number of tokens to generate","type":"`$INTEGER`","index$":3},{"active":true,"name":"messages","req":true,"short":"Array of message objects for the conversation","type":"`$ARRAY`","index$":4},{"active":true,"name":"model","req":false,"short":"The model used for generation","type":"`$STRING`","index$":5},{"active":true,"name":"object","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"seed","req":false,"short":"Seed for reproducible text generation","type":"`$INTEGER`","index$":7},{"active":true,"name":"temperature","req":false,"short":"Controls randomness in generation (0.0 to 2.0)","type":"`$NUMBER`","index$":8},{"active":true,"name":"usage","req":false,"type":"`$OBJECT`","index$":9}],"id":{"field":"id","name":"id"},"name":"generate_text","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /","json":"{\"operationId\":\"generateText\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"messages\":[{\"content\":\"Write a short poem about artificial intelligence\",\"role\":\"user\"}],\"model\":\"openai\",\"seed\":42,\"temperature\":0.7},\"schema\":{\"properties\":{\"max_tokens\":{\"description\":\"Maximum number of tokens to generate\",\"maximum\":4096,\"minimum\":1,\"type\":\"integer\"},\"messages\":{\"description\":\"Array of message objects for the conversation\",\"items\":{\"properties\":{\"content\":{\"description\":\"The content of the message\",\"type\":\"string\"},\"role\":{\"description\":\"The role of the message sender\",\"enum\":[\"system\",\"user\",\"assistant\"],\"type\":\"string\"}},\"required\":[\"role\",\"content\"],\"type\":\"object\"},\"type\":\"array\"},\"model\":{\"default\":\"openai\",\"description\":\"The language model to use for text generation\",\"enum\":[\"openai\",\"mistral\",\"claude\"],\"type\":\"string\"},\"seed\":{\"description\":\"Seed for reproducible text generation\",\"type\":\"integer\"},\"temperature\":{\"default\":1,\"description\":\"Controls randomness in generation (0.0 to 2.0)\",\"maximum\":2,\"minimum\":0,\"type\":\"number\"}},\"required\":[\"messages\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"choices\":{\"items\":{\"properties\":{\"finish_reason\":{\"enum\":[\"stop\",\"length\",\"content_filter\"],\"type\":\"string\"},\"index\":{\"type\":\"integer\"},\"message\":{\"properties\":{\"content\":{\"description\":\"The content of the message\",\"type\":\"string\"},\"role\":{\"description\":\"The role of the message sender\",\"enum\":[\"system\",\"user\",\"assistant\"],\"type\":\"string\"}},\"required\":[\"role\",\"content\"],\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"created\":{\"description\":\"Unix timestamp of when the generation was created\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the generation\",\"type\":\"string\"},\"model\":{\"description\":\"The model used for generation\",\"type\":\"string\"},\"object\":{\"example\":\"chat.completion\",\"type\":\"string\"},\"usage\":{\"properties\":{\"completion_tokens\":{\"description\":\"Number of tokens in the completion\",\"type\":\"integer\"},\"prompt_tokens\":{\"description\":\"Number of tokens in the prompt\",\"type\":\"integer\"},\"total_tokens\":{\"description\":\"Total number of tokens used\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully generated text response\",\"headers\":{\"Content-Type\":{\"schema\":{\"example\":\"application/json\",\"type\":\"string\"}}}},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters or prompt\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"type\":{\"description\":\"Type of error\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error during text generation\"}},\"security\":[],\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"generate_text","name__orig":"generate_text","Name":"GenerateText","name_":"generate_text","name-":"generate-text","NAME":"GENERATE_TEXT","index$":0}, {"active":true,"entity":"generate_text","key$":"BasicGenerateTextFlow","kind":"basic","name":"BasicGenerateTextFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"generate_text_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'GenerateText')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const generate_text_ref01_ent = client.GenerateText()
    let generate_text_ref01_data = setup.data.new.generate_text['generate_text_ref01']

    generate_text_ref01_data = (await generate_text_ref01_ent.create(generate_text_ref01_data)).data()
    assert(null != generate_text_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/generate_text/GenerateTextTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PollinationsAiSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['generate_text01','generate_text02','generate_text03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID': idmap,
    'POLLINATIONS_AI_TEST_LIVE': 'FALSE',
    'POLLINATIONS_AI_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID']

  const live = 'TRUE' === env.POLLINATIONS_AI_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['POLLINATIONS_AI_TEST_GENERATE_TEXT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PollinationsAiSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  



import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NidApplicationSystemSDK, BaseFeature, stdutil } from '../../..'

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


describe('SuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.Success()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":true,"short":"Verification code received","type":"`$STRING`","index$":0},{"active":true,"format":"email","name":"email","req":true,"short":"Registered email address","type":"`$STRING`","index$":1},{"active":true,"name":"isOverseas","req":false,"short":"Indicates if user is an overseas Bangladeshi","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"message","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"nidNumber","req":false,"short":"National Identity Card number for verification","type":"`$STRING`","index$":4},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":5}],"name":"success","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /auth/password-reset","json":"{\"operationId\":\"resetPassword\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"Registered email address\",\"format\":\"email\",\"type\":\"string\"},\"nidNumber\":{\"description\":\"National Identity Card number for verification\",\"type\":\"string\"}},\"required\":[\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Password reset instructions sent\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"User not found\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/auth/password-reset","segments":[{"lit":"auth"},{"lit":"password-reset"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /verification/send-code","json":"{\"operationId\":\"sendVerificationCode\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"email\":{\"description\":\"Email address to send verification code\",\"format\":\"email\",\"type\":\"string\"},\"isOverseas\":{\"description\":\"Indicates if user is an overseas Bangladeshi\",\"type\":\"boolean\"}},\"required\":[\"email\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Verification code sent successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid request data\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/verification/send-code","segments":[{"lit":"verification"},{"lit":"send-code"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /verification/verify-code","json":"{\"operationId\":\"verifyCode\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Verification code received\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"format\":\"email\",\"type\":\"string\"}},\"required\":[\"email\",\"code\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Code verified successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid or expired verification code\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/verification/verify-code","segments":[{"lit":"verification"},{"lit":"verify-code"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"success","name__orig":"success","Name":"Success","name_":"success","name-":"success","NAME":"SUCCESS","index$":5}, {"active":true,"entity":"success","key$":"BasicSuccessFlow","kind":"basic","name":"BasicSuccessFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"success_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Success')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const success_ref01_ent = client.Success()
    let success_ref01_data = setup.data.new.success['success_ref01']

    success_ref01_data = (await success_ref01_ent.create(success_ref01_data)).data()
    assert(null != success_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/success/SuccessTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NidApplicationSystemSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['success01','success02','success03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_SUCCESS_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_SUCCESS_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_SUCCESS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NidApplicationSystemSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.NID_APPLICATION_SYSTEM_APIKEY,
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
    explain: 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  



import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NidApplicationSystemSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NidApplicationSystemSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Success().create({"code":1,"email":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":true,"sh":"Verification code received","t":"`$STRING`","key$":"code","index$":0},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"sh":"Registered email address","t":"`$STRING`","key$":"email","index$":1},"isOverseas":{"a":true,"h":"Is Overseas","n":"isOverseas","r":false,"sh":"Indicates if user is an overseas Bangladeshi","t":"`$BOOLEAN`","key$":"isOverseas","index$":2},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":3},"nidNumber":{"a":true,"h":"Nid Number","n":"nidNumber","r":false,"sh":"National Identity Card number for verification","t":"`$STRING`","key$":"nidNumber","index$":4},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":5}},"name":"success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","nidNumber"],"co":{"id":"POST /auth/password-reset","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/password-reset","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"password-reset"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["email","isOverseas"],"co":{"id":"POST /verification/send-code","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/verification/send-code","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"verification"},{"lit":"send-code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["code","email"],"co":{"id":"POST /verification/verify-code","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/verification/verify-code","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"verification"},{"lit":"verify-code"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"success","name__orig":"success","Name":"Success","name_":"success","name-":"success","NAME":"SUCCESS","index$":5}, {"active":true,"entity":"success","key$":"BasicSuccessFlow","kind":"basic","name":"BasicSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"success_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Success', {"POST /auth/password-reset":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email"],"properties":{"email":{"type":"string","format":"email","description":"Registered email address","key$":"email"},"nidNumber":{"type":"string","description":"National Identity Card number for verification","key$":"nidNumber"}},"x-ref":"#/components/schemas/PasswordResetRequest","index$":1}}}},"parameters":[]},"POST /verification/send-code":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email"],"properties":{"email":{"type":"string","format":"email","description":"Email address to send verification code","key$":"email"},"isOverseas":{"type":"boolean","description":"Indicates if user is an overseas Bangladeshi","key$":"isOverseas"}},"x-ref":"#/components/schemas/VerificationCodeRequest","index$":1}}}},"parameters":[]},"POST /verification/verify-code":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["email","code"],"properties":{"email":{"type":"string","format":"email","description":"Email address","key$":"email"},"code":{"type":"string","description":"Verification code received","key$":"code"}},"x-ref":"#/components/schemas/VerifyCodeRequest","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  

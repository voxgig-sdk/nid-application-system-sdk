

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


describe('RegistrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.Registration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NidApplicationSystemSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Registration().create({"confirmPassword":1,"email":"x","nidNumber":"x","password":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'registration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"confirmPassword":{"a":true,"fo":"password","h":"Confirm Password","n":"confirmPassword","r":true,"sh":"Password confirmation","t":"`$STRING`","key$":"confirmPassword","index$":0},"dateOfBirth":{"a":true,"fo":"date","h":"Date Of Birth","n":"dateOfBirth","r":false,"sh":"Date of birth","t":"`$STRING`","key$":"dateOfBirth","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":true,"sh":"User's email address","t":"`$STRING`","key$":"email","index$":2},"nidNumber":{"a":true,"h":"Nid Number","n":"nidNumber","r":true,"sh":"National Identity Card number","t":"`$STRING`","key$":"nidNumber","index$":3},"password":{"a":true,"fo":"password","h":"Password","n":"password","r":true,"sh":"Account password","t":"`$STRING`","key$":"password","index$":4},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"sh":"User's phone number","t":"`$STRING`","key$":"phone","index$":5}},"name":"registration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["confirmPassword","dateOfBirth","email","nidNumber","password","phone"],"co":{"id":"POST /auth/register","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/register","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"auth"},{"lit":"register"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"registration","name__orig":"registration","Name":"Registration","name_":"registration","name-":"registration","NAME":"REGISTRATION","index$":4}, {"active":true,"entity":"registration","key$":"BasicRegistrationFlow","kind":"basic","name":"BasicRegistrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"registration_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Registration', {"POST /auth/register":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["nidNumber","email","password","confirmPassword"],"properties":{"nidNumber":{"type":"string","description":"National Identity Card number","key$":"nidNumber"},"email":{"type":"string","format":"email","description":"User's email address","key$":"email"},"password":{"type":"string","format":"password","description":"Account password","key$":"password"},"confirmPassword":{"type":"string","format":"password","description":"Password confirmation","key$":"confirmPassword"},"phone":{"type":"string","description":"User's phone number","key$":"phone"},"dateOfBirth":{"type":"string","format":"date","description":"Date of birth","key$":"dateOfBirth"}},"x-ref":"#/components/schemas/RegistrationRequest","index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const registration_ref01_ent = client.Registration()
    let registration_ref01_data = setup.data.new.registration['registration_ref01']

    registration_ref01_data = (await registration_ref01_ent.create(registration_ref01_data)).data()
    assert(null != registration_ref01_data)


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
      '../../../../.sdk/test/entity/registration/RegistrationTestData.json')

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
    ['registration01','registration02','registration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID']
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
  



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


describe('RegistrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.Registration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'registration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"password","name":"confirmPassword","req":true,"short":"Password confirmation","type":"`$STRING`","index$":0},{"active":true,"format":"date","name":"dateOfBirth","req":false,"short":"Date of birth","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"email","req":true,"short":"User's email address","type":"`$STRING`","index$":2},{"active":true,"name":"nidNumber","req":true,"short":"National Identity Card number","type":"`$STRING`","index$":3},{"active":true,"format":"password","name":"password","req":true,"short":"Account password","type":"`$STRING`","index$":4},{"active":true,"name":"phone","req":false,"short":"User's phone number","type":"`$STRING`","index$":5}],"name":"registration","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /auth/register","json":"{\"operationId\":\"registerUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"confirmPassword\":{\"description\":\"Password confirmation\",\"format\":\"password\",\"type\":\"string\"},\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"email\":{\"description\":\"User's email address\",\"format\":\"email\",\"type\":\"string\"},\"nidNumber\":{\"description\":\"National Identity Card number\",\"type\":\"string\"},\"password\":{\"description\":\"Account password\",\"format\":\"password\",\"type\":\"string\"},\"phone\":{\"description\":\"User's phone number\",\"type\":\"string\"}},\"required\":[\"nidNumber\",\"email\",\"password\",\"confirmPassword\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"type\":\"boolean\"},\"userId\":{\"description\":\"Newly created user ID\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Account successfully created\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid registration data\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Account already exists\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/auth/register","segments":[{"lit":"auth"},{"lit":"register"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"registration","name__orig":"registration","Name":"Registration","name_":"registration","name-":"registration","NAME":"REGISTRATION","index$":4}, {"active":true,"entity":"registration","key$":"BasicRegistrationFlow","kind":"basic","name":"BasicRegistrationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"registration_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Registration')
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
  

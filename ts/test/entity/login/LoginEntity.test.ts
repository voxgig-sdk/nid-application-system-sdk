

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


describe('LoginEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.Login()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'login.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"accountStatus","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"captcha","req":true,"short":"Captcha code displayed in the image","type":"`$STRING`","index$":1},{"active":true,"format":"email","name":"email","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"fullName","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"nidNumber","req":false,"type":"`$STRING`","index$":4},{"active":true,"format":"password","name":"password","req":true,"short":"User's password","type":"`$STRING`","index$":5},{"active":true,"name":"phone","req":false,"type":"`$STRING`","index$":6},{"active":true,"name":"userId","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"username","req":true,"short":"User's username or NID number","type":"`$STRING`","index$":8}],"name":"login","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /auth/login","json":"{\"operationId\":\"loginUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"captcha\":{\"description\":\"Captcha code displayed in the image\",\"type\":\"string\"},\"password\":{\"description\":\"User's password\",\"format\":\"password\",\"type\":\"string\"},\"username\":{\"description\":\"User's username or NID number\",\"type\":\"string\"}},\"required\":[\"username\",\"password\",\"captcha\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"expiresIn\":{\"description\":\"Token expiration time in seconds\",\"type\":\"integer\"},\"success\":{\"type\":\"boolean\"},\"token\":{\"description\":\"Authentication token\",\"type\":\"string\"},\"user\":{\"properties\":{\"accountStatus\":{\"enum\":[\"active\",\"pending\",\"suspended\"],\"type\":\"string\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"fullName\":{\"type\":\"string\"},\"nidNumber\":{\"type\":\"string\"},\"phone\":{\"type\":\"string\"},\"userId\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful login\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid captcha or missing fields\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid credentials\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/auth/login","segments":[{"lit":"auth"},{"lit":"login"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.user`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"login","name__orig":"login","Name":"Login","name_":"login","name-":"login","NAME":"LOGIN","index$":2}, {"active":true,"entity":"login","key$":"BasicLoginFlow","kind":"basic","name":"BasicLoginFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"login_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Login')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const login_ref01_ent = client.Login()
    let login_ref01_data = setup.data.new.login['login_ref01']

    login_ref01_data = (await login_ref01_ent.create(login_ref01_data)).data()
    assert(null != login_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/login/LoginTestData.json')

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
    ['login01','login02','login03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_LOGIN_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_LOGIN_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_LOGIN_ENTID']
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
  



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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accountStatus":{"a":true,"h":"Account Status","n":"accountStatus","r":false,"t":"`$STRING`","key$":"accountStatus","index$":0},"captcha":{"a":true,"h":"Captcha","n":"captcha","r":true,"sh":"Captcha code displayed in the image","t":"`$STRING`","key$":"captcha","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":2},"fullName":{"a":true,"h":"Full Name","n":"fullName","r":false,"t":"`$STRING`","key$":"fullName","index$":3},"nidNumber":{"a":true,"h":"Nid Number","n":"nidNumber","r":false,"t":"`$STRING`","key$":"nidNumber","index$":4},"password":{"a":true,"fo":"password","h":"Password","n":"password","r":true,"sh":"User's password","t":"`$STRING`","key$":"password","index$":5},"phone":{"a":true,"h":"Phone","n":"phone","r":false,"t":"`$STRING`","key$":"phone","index$":6},"userId":{"a":true,"h":"User Id","n":"userId","r":false,"t":"`$STRING`","key$":"userId","index$":7},"username":{"a":true,"h":"Username","n":"username","r":true,"sh":"User's username or NID number","t":"`$STRING`","key$":"username","index$":8}},"name":"login","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /auth/login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/auth/login","q":{},"r":{},"s":[{"lit":"auth"},{"lit":"login"}],"t":{"req":"`reqdata`","res":"`body.user`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"login","name__orig":"login","Name":"Login","name_":"login","name-":"login","NAME":"LOGIN","index$":2}, {"active":true,"entity":"login","key$":"BasicLoginFlow","kind":"basic","name":"BasicLoginFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"login_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Login', {"POST /auth/login":{"protocol":"http","operationId":"loginUser","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["username","password","captcha"],"properties":{"username":{"type":"string","description":"User's username or NID number","key$":"username"},"password":{"type":"string","format":"password","description":"User's password","key$":"password"},"captcha":{"type":"string","description":"Captcha code displayed in the image","key$":"captcha"}},"x-ref":"#/components/schemas/LoginRequest","index$":1}}}},"responses":{"200":{"description":"Successful login","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"token":{"type":"string","description":"Authentication token"},"user":{"type":"object","properties":{"userId":{"type":"string","key$":"userId"},"nidNumber":{"type":"string","key$":"nidNumber"},"email":{"type":"string","format":"email","key$":"email"},"fullName":{"type":"string","key$":"fullName"},"phone":{"type":"string","key$":"phone"},"accountStatus":{"type":"string","enum":["active","pending","suspended"],"key$":"accountStatus"}},"x-ref":"#/components/schemas/User","index$":0},"expiresIn":{"type":"integer","description":"Token expiration time in seconds"}},"x-ref":"#/components/schemas/LoginResponse"}}}},"400":{"description":"Bad request - invalid captcha or missing fields","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Invalid credentials","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT authentication token obtained from login endpoint"}}}})
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
  

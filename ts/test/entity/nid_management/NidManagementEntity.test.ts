

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


describe('NidManagementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.NidManagement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'nid_management.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"nid_management","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /nid/download","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"pdf","k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"nid_number","or":"nid_number","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/nid/download","q":{"exist":["format","nid_number"]},"r":{},"s":[{"lit":"nid"},{"lit":"download"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"nid_management","name__orig":"nid_management","Name":"NidManagement","name_":"nid_management","name-":"nid-management","NAME":"NID_MANAGEMENT","index$":3}, {"active":true,"entity":"nid_management","key$":"BasicNidManagementFlow","kind":"basic","name":"BasicNidManagementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"nid_management_ref01","srcdatavar":"nid_management_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-nid_management_ref01"}}],"index$":0}]}, 'NidManagement', {"GET /nid/download":{"protocol":"http","operationId":"downloadNID","responses":{"200":{"description":"NID copy download successful","content":{"application/pdf":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"401":{"description":"Unauthorized - authentication required","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"404":{"description":"NID not found or not available for download","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[{"name":"nidNumber","in":"query","description":"National Identity Card number","required":true,"schema":{"type":"string"},"index$":0},{"name":"format","in":"query","description":"Download format","required":false,"schema":{"type":"string","enum":["pdf","png"],"default":"pdf"},"index$":1}],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT authentication token obtained from login endpoint"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let nid_management_ref01_data = Object.values(setup.data.existing.nid_management)[0] as any

    // LOAD
    const nid_management_ref01_ent = client.NidManagement()
    const nid_management_ref01_match_dt0: any = {}
    const nid_management_ref01_data_dt0 = (await nid_management_ref01_ent.load(nid_management_ref01_match_dt0)).data()
    assert(null != nid_management_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/nid_management/NidManagementTestData.json')

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
    ['nid_management01','nid_management02','nid_management03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_NID_MANAGEMENT_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_NID_MANAGEMENT_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_NID_MANAGEMENT_ENTID']
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
  

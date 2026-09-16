

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


describe('ApplicationStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.ApplicationStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'application_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"applicationId","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"applicationType","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"format":"date-time","name":"lastUpdated","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"nidNumber","req":false,"short":"NID number (if approved)","type":"`$STRING`","index$":4},{"active":true,"name":"remarks","req":false,"short":"Additional remarks or notes","type":"`$STRING`","index$":5},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":6},{"active":true,"format":"date-time","name":"submissionDate","req":false,"type":"`$STRING`","index$":7}],"id":{"field":"id","name":"id"},"name":"application_status","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"application_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /application/status/{applicationId}","json":"{\"operationId\":\"getApplicationStatus\",\"parameters\":[{\"description\":\"Application ID\",\"in\":\"path\",\"name\":\"applicationId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"applicationId\":{\"type\":\"string\"},\"applicationType\":{\"enum\":[\"new_registration\",\"correction\",\"duplicate\"],\"type\":\"string\"},\"lastUpdated\":{\"format\":\"date-time\",\"type\":\"string\"},\"nidNumber\":{\"description\":\"NID number (if approved)\",\"type\":\"string\"},\"remarks\":{\"description\":\"Additional remarks or notes\",\"type\":\"string\"},\"status\":{\"enum\":[\"submitted\",\"under_review\",\"approved\",\"rejected\",\"pending_documents\"],\"type\":\"string\"},\"submissionDate\":{\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Application status retrieved successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - authentication required\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Application not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/application/status/{applicationId}","rename":{"param":{"applicationId":"id"}},"segments":[{"lit":"application"},{"lit":"status"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"application_status","name__orig":"application_status","Name":"ApplicationStatus","name_":"application_status","name-":"application-status","NAME":"APPLICATION_STATUS","index$":1}, {"active":true,"entity":"application_status","key$":"BasicApplicationStatusFlow","kind":"basic","name":"BasicApplicationStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"application_status_ref01","srcdatavar":"application_status_ref01_data","suffix":"_dt0"},"match":{"id":"application_status01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-application_status_ref01"}}],"index$":0}]}, 'ApplicationStatus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let application_status_ref01_data = Object.values(setup.data.existing.application_status)[0] as any

    // LOAD
    const application_status_ref01_ent = client.ApplicationStatus()
    const application_status_ref01_match_dt0: any = {}
    application_status_ref01_match_dt0.id = application_status_ref01_data.id
    const application_status_ref01_data_dt0 = (await application_status_ref01_ent.load(application_status_ref01_match_dt0)).data()
    assert(application_status_ref01_data_dt0.id === application_status_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/application_status/ApplicationStatusTestData.json')

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
    ['application_status01','application_status02','application_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID']
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
  

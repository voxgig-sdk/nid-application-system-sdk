

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


describe('ApplicationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('NID_APPLICATION_SYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NidApplicationSystemSDK.test()
    const ent = testsdk.Application()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'application.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"additionalInfo","req":false,"short":"Additional information","type":"`$STRING`","index$":0},{"active":true,"name":"nidNumber","req":true,"short":"National Identity Card number","type":"`$STRING`","index$":1},{"active":true,"name":"policeReportNumber","req":false,"short":"Police report number (if lost or stolen)","type":"`$STRING`","index$":2},{"active":true,"name":"reason","req":true,"short":"Reason for requesting duplicate","type":"`$STRING`","index$":3}],"name":"application","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /application/correction","json":"{\"operationId\":\"applyCorrection\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"correctedValue\":{\"description\":\"Corrected value\",\"type\":\"string\"},\"correctionType\":{\"description\":\"Type of correction needed\",\"enum\":[\"name\",\"dateOfBirth\",\"address\",\"fatherName\",\"motherName\",\"photograph\",\"other\"],\"type\":\"string\"},\"currentValue\":{\"description\":\"Current incorrect value\",\"type\":\"string\"},\"nidNumber\":{\"description\":\"National Identity Card number to be corrected\",\"type\":\"string\"},\"reason\":{\"description\":\"Reason for correction\",\"type\":\"string\"},\"supportingDocuments\":{\"description\":\"Supporting documents for correction\",\"items\":{\"format\":\"binary\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"nidNumber\",\"correctionType\",\"correctedValue\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"applicationId\":{\"description\":\"Unique application ID\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"status\":{\"description\":\"Current application status\",\"enum\":[\"submitted\",\"under_review\",\"approved\",\"rejected\"],\"type\":\"string\"},\"submissionDate\":{\"description\":\"Date and time of submission\",\"format\":\"date-time\",\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Correction application submitted successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid correction data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - authentication required\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/application/correction","segments":[{"lit":"application"},{"lit":"correction"}],"select":{"$action":"correction"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /application/duplicate","json":"{\"operationId\":\"applyDuplicate\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"additionalInfo\":{\"description\":\"Additional information\",\"type\":\"string\"},\"nidNumber\":{\"description\":\"National Identity Card number\",\"type\":\"string\"},\"policeReportNumber\":{\"description\":\"Police report number (if lost or stolen)\",\"type\":\"string\"},\"reason\":{\"description\":\"Reason for requesting duplicate\",\"enum\":[\"lost\",\"damaged\",\"stolen\"],\"type\":\"string\"}},\"required\":[\"nidNumber\",\"reason\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"applicationId\":{\"description\":\"Unique application ID\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"status\":{\"description\":\"Current application status\",\"enum\":[\"submitted\",\"under_review\",\"approved\",\"rejected\"],\"type\":\"string\"},\"submissionDate\":{\"description\":\"Date and time of submission\",\"format\":\"date-time\",\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Duplicate copy request submitted successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid request data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - authentication required\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/application/duplicate","segments":[{"lit":"application"},{"lit":"duplicate"}],"select":{"$action":"duplicate"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /application/new-registration","json":"{\"operationId\":\"applyNewRegistration\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"address\":{\"properties\":{\"district\":{\"type\":\"string\"},\"division\":{\"type\":\"string\"},\"union\":{\"type\":\"string\"},\"upazila\":{\"type\":\"string\"},\"village\":{\"type\":\"string\"}},\"type\":\"object\"},\"dateOfBirth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"fatherName\":{\"description\":\"Father's name\",\"type\":\"string\"},\"fullName\":{\"description\":\"Full name in Bengali\",\"type\":\"string\"},\"fullNameEnglish\":{\"description\":\"Full name in English\",\"type\":\"string\"},\"gender\":{\"description\":\"Gender\",\"enum\":[\"male\",\"female\",\"other\"],\"type\":\"string\"},\"isOverseas\":{\"description\":\"Indicates if applicant is an overseas Bangladeshi\",\"type\":\"boolean\"},\"motherName\":{\"description\":\"Mother's name\",\"type\":\"string\"},\"photograph\":{\"description\":\"Passport-sized photograph\",\"format\":\"binary\",\"type\":\"string\"},\"signature\":{\"description\":\"Signature image\",\"format\":\"binary\",\"type\":\"string\"},\"supportingDocuments\":{\"description\":\"Supporting documents (birth certificate, etc.)\",\"items\":{\"format\":\"binary\",\"type\":\"string\"},\"type\":\"array\"}},\"required\":[\"fullName\",\"dateOfBirth\",\"fatherName\",\"motherName\",\"address\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"applicationId\":{\"description\":\"Unique application ID\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"status\":{\"description\":\"Current application status\",\"enum\":[\"submitted\",\"under_review\",\"approved\",\"rejected\"],\"type\":\"string\"},\"submissionDate\":{\"description\":\"Date and time of submission\",\"format\":\"date-time\",\"type\":\"string\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Application submitted successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Invalid application data\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"},\"success\":{\"default\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - authentication required\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token obtained from login endpoint\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/application/new-registration","segments":[{"lit":"application"},{"lit":"new-registration"}],"select":{"$action":"new_registration"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"application","name__orig":"application","Name":"Application","name_":"application","name-":"application","NAME":"APPLICATION","index$":0}, {"active":true,"entity":"application","key$":"BasicApplicationFlow","kind":"basic","name":"BasicApplicationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"application_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Application')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const application_ref01_ent = client.Application()
    let application_ref01_data = setup.data.new.application['application_ref01']

    application_ref01_data = (await application_ref01_ent.create(application_ref01_data)).data()
    assert(null != application_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/application/ApplicationTestData.json')

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
    ['application01','application02','application03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NID_APPLICATION_SYSTEM_TEST_APPLICATION_ENTID': idmap,
    'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
    'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
    'NID_APPLICATION_SYSTEM_APIKEY': '',
  })

  idmap = env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_ENTID']

  const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_ENTID']
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
  

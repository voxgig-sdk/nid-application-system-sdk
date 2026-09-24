

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"application","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /application/correction","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/application/correction","q":{"$action":"correction"},"r":{},"s":[{"lit":"application"},{"lit":"correction"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /application/duplicate","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/application/duplicate","q":{"$action":"duplicate"},"r":{},"s":[{"lit":"application"},{"lit":"duplicate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /application/new-registration","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/application/new-registration","q":{"$action":"new_registration"},"r":{},"s":[{"lit":"application"},{"lit":"new-registration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"application","name__orig":"application","Name":"Application","name_":"application","name-":"application","NAME":"APPLICATION","index$":0}, {"active":true,"entity":"application","key$":"BasicApplicationFlow","kind":"basic","name":"BasicApplicationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"application_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Application', {"POST /application/correction":{"protocol":"http","operationId":"applyCorrection","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["nidNumber","correctionType","correctedValue"],"properties":{"nidNumber":{"type":"string","description":"National Identity Card number to be corrected"},"correctionType":{"type":"string","enum":["name","dateOfBirth","address","fatherName","motherName","photograph","other"],"description":"Type of correction needed"},"currentValue":{"type":"string","description":"Current incorrect value"},"correctedValue":{"type":"string","description":"Corrected value"},"reason":{"type":"string","description":"Reason for correction"},"supportingDocuments":{"type":"array","items":{"type":"string","format":"binary"},"description":"Supporting documents for correction"}},"x-ref":"#/components/schemas/CorrectionRequest"}}}},"responses":{"201":{"description":"Correction application submitted successfully","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"message":{"type":"string"},"applicationId":{"type":"string","description":"Unique application ID"},"submissionDate":{"type":"string","format":"date-time","description":"Date and time of submission"},"status":{"type":"string","enum":["submitted","under_review","approved","rejected"],"description":"Current application status"}},"x-ref":"#/components/schemas/ApplicationResponse"}}}},"400":{"description":"Invalid correction data","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Unauthorized - authentication required","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT authentication token obtained from login endpoint"}}},"POST /application/duplicate":{"protocol":"http","operationId":"applyDuplicate","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["nidNumber","reason"],"properties":{"nidNumber":{"type":"string","description":"National Identity Card number"},"reason":{"type":"string","enum":["lost","damaged","stolen"],"description":"Reason for requesting duplicate"},"policeReportNumber":{"type":"string","description":"Police report number (if lost or stolen)"},"additionalInfo":{"type":"string","description":"Additional information"}},"x-ref":"#/components/schemas/DuplicateRequest"}}}},"responses":{"201":{"description":"Duplicate copy request submitted successfully","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"message":{"type":"string"},"applicationId":{"type":"string","description":"Unique application ID"},"submissionDate":{"type":"string","format":"date-time","description":"Date and time of submission"},"status":{"type":"string","enum":["submitted","under_review","approved","rejected"],"description":"Current application status"}},"x-ref":"#/components/schemas/ApplicationResponse"}}}},"400":{"description":"Invalid request data","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Unauthorized - authentication required","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT authentication token obtained from login endpoint"}}},"POST /application/new-registration":{"protocol":"http","operationId":"applyNewRegistration","requestBody":{"required":true,"content":{"multipart/form-data":{"schema":{"type":"object","required":["fullName","dateOfBirth","fatherName","motherName","address"],"properties":{"fullName":{"type":"string","description":"Full name in Bengali"},"fullNameEnglish":{"type":"string","description":"Full name in English"},"dateOfBirth":{"type":"string","format":"date","description":"Date of birth"},"gender":{"type":"string","enum":["male","female","other"],"description":"Gender"},"fatherName":{"type":"string","description":"Father's name"},"motherName":{"type":"string","description":"Mother's name"},"address":{"type":"object","properties":{"division":{"type":"string"},"district":{"type":"string"},"upazila":{"type":"string"},"union":{"type":"string"},"village":{"type":"string"}}},"photograph":{"type":"string","format":"binary","description":"Passport-sized photograph"},"signature":{"type":"string","format":"binary","description":"Signature image"},"supportingDocuments":{"type":"array","items":{"type":"string","format":"binary"},"description":"Supporting documents (birth certificate, etc.)"},"isOverseas":{"type":"boolean","description":"Indicates if applicant is an overseas Bangladeshi"}},"x-ref":"#/components/schemas/NewRegistrationRequest"}}}},"responses":{"201":{"description":"Application submitted successfully","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean"},"message":{"type":"string"},"applicationId":{"type":"string","description":"Unique application ID"},"submissionDate":{"type":"string","format":"date-time","description":"Date and time of submission"},"status":{"type":"string","enum":["submitted","under_review","approved","rejected"],"description":"Current application status"}},"x-ref":"#/components/schemas/ApplicationResponse"}}}},"400":{"description":"Invalid application data","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}},"401":{"description":"Unauthorized - authentication required","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","default":false},"error":{"type":"string","description":"Error message"},"code":{"type":"string","description":"Error code"},"details":{"type":"object","description":"Additional error details"}},"x-ref":"#/components/schemas/ErrorResponse"}}}}},"parameters":[],"security":[{"bearerAuth":[]}],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"JWT authentication token obtained from login endpoint"}}}})
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
  

import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "application",
    "accessor": "Application",
    "op": "create",
    "method": "POST",
    "path": "/application/correction",
    "action": "correction",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "success": true,
      "message": "x",
      "applicationId": "x",
      "submissionDate": "2026-01-01T00:00:00Z",
      "status": "submitted"
    },
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "create",
    "method": "POST",
    "path": "/application/duplicate",
    "action": "duplicate",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "success": true,
      "message": "x",
      "applicationId": "x",
      "submissionDate": "2026-01-01T00:00:00Z",
      "status": "submitted"
    },
    "idField": "id"
  },
  {
    "entity": "application",
    "accessor": "Application",
    "op": "create",
    "method": "POST",
    "path": "/application/new-registration",
    "action": "new_registration",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 201,
    "sample": {
      "success": true,
      "message": "x",
      "applicationId": "x",
      "submissionDate": "2026-01-01T00:00:00Z",
      "status": "submitted"
    },
    "idField": "id"
  },
  {
    "entity": "application_status",
    "accessor": "ApplicationStatus",
    "op": "load",
    "method": "GET",
    "path": "/application/status/{applicationId}",
    "args": [
      {
        "name": "id",
        "wire": "applicationId",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": {
      "applicationId": "x",
      "applicationType": "new_registration",
      "status": "submitted",
      "submissionDate": "2026-01-01T00:00:00Z",
      "lastUpdated": "2026-01-01T00:00:00Z",
      "remarks": "x",
      "nidNumber": "x"
    },
    "idField": "id"
  },
  {
    "entity": "login",
    "accessor": "Login",
    "op": "create",
    "method": "POST",
    "path": "/auth/login",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [],
    "status": 200,
    "sample": {
      "success": true,
      "token": "x",
      "user": {
        "userId": "x",
        "nidNumber": "x",
        "email": "x",
        "fullName": "x",
        "phone": "x",
        "accountStatus": "active"
      },
      "expiresIn": 1
    },
    "idField": "id"
  },
  {
    "entity": "nid_management",
    "accessor": "NidManagement",
    "op": "load",
    "method": "GET",
    "path": "/nid/download",
    "args": [],
    "select": {
      "format": "v1",
      "nid_number": "v1"
    },
    "headers": [],
    "query": [
      "nidNumber",
      "format"
    ],
    "auth": [
      [
        {
          "in": "header",
          "name": "authorization",
          "scheme": "bearer"
        }
      ]
    ],
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "registration",
    "accessor": "Registration",
    "op": "create",
    "method": "POST",
    "path": "/auth/register",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": [],
    "status": 201,
    "sample": {
      "success": true,
      "message": "x",
      "userId": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

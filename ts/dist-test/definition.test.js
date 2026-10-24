"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
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
            "nid_number": "v1",
            "format": "pdf"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/pdf",
            "image/png"
        ],
        "query": [
            "nidNumber",
            "format"
        ],
        "queryArgs": [
            {
                "name": "format",
                "wire": "format"
            },
            {
                "name": "nid_number",
                "wire": "nidNumber"
            }
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
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 201,
        "sample": {
            "success": true,
            "message": "x",
            "userId": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map
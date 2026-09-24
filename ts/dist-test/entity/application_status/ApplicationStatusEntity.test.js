"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApplicationStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NID_APPLICATION_SYSTEM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NidApplicationSystemSDK.test();
        const ent = testsdk.ApplicationStatus();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'application_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "applicationId": { "a": true, "h": "Application Id", "n": "applicationId", "r": false, "t": "`$STRING`", "key$": "applicationId", "index$": 0 }, "applicationType": { "a": true, "h": "Application Type", "n": "applicationType", "r": false, "t": "`$STRING`", "key$": "applicationType", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "lastUpdated": { "a": true, "fo": "date-time", "h": "Last Updated", "n": "lastUpdated", "r": false, "t": "`$STRING`", "key$": "lastUpdated", "index$": 3 }, "nidNumber": { "a": true, "h": "Nid Number", "n": "nidNumber", "r": false, "sh": "NID number (if approved)", "t": "`$STRING`", "key$": "nidNumber", "index$": 4 }, "remarks": { "a": true, "h": "Remarks", "n": "remarks", "r": false, "sh": "Additional remarks or notes", "t": "`$STRING`", "key$": "remarks", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 6 }, "submissionDate": { "a": true, "fo": "date-time", "h": "Submission Date", "n": "submissionDate", "r": false, "t": "`$STRING`", "key$": "submissionDate", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "application_status", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /application/status/{applicationId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "application_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/application/status/{applicationId}", "q": { "exist": ["id"] }, "r": { "param": { "applicationId": "id" } }, "s": [{ "lit": "application" }, { "lit": "status" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "application_status", "name__orig": "application_status", "Name": "ApplicationStatus", "name_": "application_status", "name-": "application-status", "NAME": "APPLICATION_STATUS", "index$": 1 }, { "active": true, "entity": "application_status", "key$": "BasicApplicationStatusFlow", "kind": "basic", "name": "BasicApplicationStatusFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "application_status_ref01", "srcdatavar": "application_status_ref01_data", "suffix": "_dt0" }, "m": { "id": "application_status01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-application_status_ref01" } }], "index$": 0 }] }, 'ApplicationStatus', { "GET /application/status/{applicationId}": { "protocol": "http", "operationId": "getApplicationStatus", "responses": { "200": { "description": "Application status retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "applicationId": { "type": "string", "key$": "applicationId" }, "applicationType": { "type": "string", "enum": ["new_registration", "correction", "duplicate"], "key$": "applicationType" }, "status": { "type": "string", "enum": ["submitted", "under_review", "approved", "rejected", "pending_documents"], "key$": "status" }, "submissionDate": { "type": "string", "format": "date-time", "key$": "submissionDate" }, "lastUpdated": { "type": "string", "format": "date-time", "key$": "lastUpdated" }, "remarks": { "type": "string", "description": "Additional remarks or notes", "key$": "remarks" }, "nidNumber": { "type": "string", "description": "NID number (if approved)", "key$": "nidNumber" } }, "x-ref": "#/components/schemas/ApplicationStatusResponse", "index$": 0 } } } }, "401": { "description": "Unauthorized - authentication required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "default": false }, "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "object", "description": "Additional error details" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "404": { "description": "Application not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "default": false }, "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "object", "description": "Additional error details" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [{ "name": "applicationId", "in": "path", "description": "Application ID", "required": true, "schema": { "type": "string" }, "index$": 0 }], "security": [{ "bearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT authentication token obtained from login endpoint" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let application_status_ref01_data = Object.values(setup.data.existing.application_status)[0];
        // LOAD
        const application_status_ref01_ent = client.ApplicationStatus();
        const application_status_ref01_match_dt0 = {};
        application_status_ref01_match_dt0.id = application_status_ref01_data.id;
        const application_status_ref01_data_dt0 = (await application_status_ref01_ent.load(application_status_ref01_match_dt0)).data();
        (0, node_assert_1.default)(application_status_ref01_data_dt0.id === application_status_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/application_status/ApplicationStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NidApplicationSystemSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['application_status01', 'application_status02', 'application_status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID': idmap,
        'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
        'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
        'NID_APPLICATION_SYSTEM_APIKEY': '',
    });
    idmap = env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID'];
    const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_APPLICATION_STATUS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NidApplicationSystemSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ApplicationStatusEntity.test.js.map
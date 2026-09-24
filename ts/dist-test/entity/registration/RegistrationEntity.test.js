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
(0, node_test_1.describe)('RegistrationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NID_APPLICATION_SYSTEM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NidApplicationSystemSDK.test();
        const ent = testsdk.Registration();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NID_APPLICATION_SYSTEM_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'registration.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "confirmPassword": { "a": true, "fo": "password", "h": "Confirm Password", "n": "confirmPassword", "r": true, "sh": "Password confirmation", "t": "`$STRING`", "key$": "confirmPassword", "index$": 0 }, "dateOfBirth": { "a": true, "fo": "date", "h": "Date Of Birth", "n": "dateOfBirth", "r": false, "sh": "Date of birth", "t": "`$STRING`", "key$": "dateOfBirth", "index$": 1 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "sh": "User's email address", "t": "`$STRING`", "key$": "email", "index$": 2 }, "nidNumber": { "a": true, "h": "Nid Number", "n": "nidNumber", "r": true, "sh": "National Identity Card number", "t": "`$STRING`", "key$": "nidNumber", "index$": 3 }, "password": { "a": true, "fo": "password", "h": "Password", "n": "password", "r": true, "sh": "Account password", "t": "`$STRING`", "key$": "password", "index$": 4 }, "phone": { "a": true, "h": "Phone", "n": "phone", "r": false, "sh": "User's phone number", "t": "`$STRING`", "key$": "phone", "index$": 5 } }, "name": "registration", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /auth/register", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/auth/register", "q": {}, "r": {}, "s": [{ "lit": "auth" }, { "lit": "register" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "registration", "name__orig": "registration", "Name": "Registration", "name_": "registration", "name-": "registration", "NAME": "REGISTRATION", "index$": 4 }, { "active": true, "entity": "registration", "key$": "BasicRegistrationFlow", "kind": "basic", "name": "BasicRegistrationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "registration_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Registration', { "POST /auth/register": { "protocol": "http", "operationId": "registerUser", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["nidNumber", "email", "password", "confirmPassword"], "properties": { "nidNumber": { "type": "string", "description": "National Identity Card number", "key$": "nidNumber" }, "email": { "type": "string", "format": "email", "description": "User's email address", "key$": "email" }, "password": { "type": "string", "format": "password", "description": "Account password", "key$": "password" }, "confirmPassword": { "type": "string", "format": "password", "description": "Password confirmation", "key$": "confirmPassword" }, "phone": { "type": "string", "description": "User's phone number", "key$": "phone" }, "dateOfBirth": { "type": "string", "format": "date", "description": "Date of birth", "key$": "dateOfBirth" } }, "x-ref": "#/components/schemas/RegistrationRequest", "index$": 1 } } } }, "responses": { "201": { "description": "Account successfully created", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean" }, "message": { "type": "string" }, "userId": { "type": "string", "description": "Newly created user ID" } }, "x-ref": "#/components/schemas/RegistrationResponse" } } } }, "400": { "description": "Invalid registration data", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "default": false }, "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "object", "description": "Additional error details" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } }, "409": { "description": "Account already exists", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "default": false }, "error": { "type": "string", "description": "Error message" }, "code": { "type": "string", "description": "Error code" }, "details": { "type": "object", "description": "Additional error details" } }, "x-ref": "#/components/schemas/ErrorResponse" } } } } }, "parameters": [], "securitySource": "unspecified", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "JWT authentication token obtained from login endpoint" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const registration_ref01_ent = client.Registration();
        let registration_ref01_data = setup.data.new.registration['registration_ref01'];
        registration_ref01_data = (await registration_ref01_ent.create(registration_ref01_data)).data();
        (0, node_assert_1.default)(null != registration_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/registration/RegistrationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NidApplicationSystemSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['registration01', 'registration02', 'registration03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID': idmap,
        'NID_APPLICATION_SYSTEM_TEST_LIVE': 'FALSE',
        'NID_APPLICATION_SYSTEM_TEST_EXPLAIN': 'FALSE',
        'NID_APPLICATION_SYSTEM_APIKEY': '',
    });
    idmap = env['NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID'];
    const live = 'TRUE' === env.NID_APPLICATION_SYSTEM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NID_APPLICATION_SYSTEM_TEST_REGISTRATION_ENTID'];
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
//# sourceMappingURL=RegistrationEntity.test.js.map
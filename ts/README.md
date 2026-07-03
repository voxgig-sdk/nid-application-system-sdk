# NidApplicationSystem TypeScript SDK



The TypeScript SDK for the NidApplicationSystem API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install @voxgig-sdk/nid-application-system
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { NidApplicationSystemSDK } from 'nid-application-system'

const client = new NidApplicationSystemSDK({
  apikey: process.env.NID-APPLICATION-SYSTEM_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.Application().create({
  name: 'Example',
})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = NidApplicationSystemSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new NidApplicationSystemSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new NidApplicationSystemSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
NID-APPLICATION-SYSTEM_TEST_LIVE=TRUE
NID-APPLICATION-SYSTEM_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### NidApplicationSystemSDK

#### Constructor

```ts
new NidApplicationSystemSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Application(data?)` | `ApplicationEntity` | Create a Application entity instance. |
| `ApplicationStatus(data?)` | `ApplicationStatusEntity` | Create a ApplicationStatus entity instance. |
| `Login(data?)` | `LoginEntity` | Create a Login entity instance. |
| `NidManagement(data?)` | `NidManagementEntity` | Create a NidManagement entity instance. |
| `Registration(data?)` | `RegistrationEntity` | Create a Registration entity instance. |
| `Success(data?)` | `SuccessEntity` | Create a Success entity instance. |
| `tester(testopts?, sdkopts?)` | `NidApplicationSystemSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `NidApplicationSystemSDK.test(testopts?, sdkopts?)` | `NidApplicationSystemSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): NidApplicationSystemSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Application

| Field | Description |
| --- | --- |
| `additional_info` |  |
| `nid_number` |  |
| `police_report_number` |  |
| `reason` |  |

Operations: create.

API path: `/application/correction`

#### ApplicationStatus

| Field | Description |
| --- | --- |
| `application_id` |  |
| `application_type` |  |
| `last_updated` |  |
| `nid_number` |  |
| `remark` |  |
| `status` |  |
| `submission_date` |  |

Operations: load.

API path: `/application/status/{applicationId}`

#### Login

| Field | Description |
| --- | --- |
| `captcha` |  |
| `expires_in` |  |
| `password` |  |
| `success` |  |
| `token` |  |
| `user` |  |
| `username` |  |

Operations: create.

API path: `/auth/login`

#### NidManagement

| Field | Description |
| --- | --- |

Operations: load.

API path: `/nid/download`

#### Registration

| Field | Description |
| --- | --- |
| `confirm_password` |  |
| `date_of_birth` |  |
| `email` |  |
| `nid_number` |  |
| `password` |  |
| `phone` |  |

Operations: create.

API path: `/auth/register`

#### Success

| Field | Description |
| --- | --- |
| `code` |  |
| `email` |  |
| `is_oversea` |  |
| `message` |  |
| `nid_number` |  |
| `success` |  |

Operations: create.

API path: `/auth/password-reset`



## Entities


### Application

Create an instance: `const application = client.Application()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_info` | ``$STRING`` |  |
| `nid_number` | ``$STRING`` |  |
| `police_report_number` | ``$STRING`` |  |
| `reason` | ``$STRING`` |  |

#### Example: Create

```ts
const application = await client.Application().create({
  nid_number: /* `$STRING` */,
  reason: /* `$STRING` */,
})
```


### ApplicationStatus

Create an instance: `const application_status = client.ApplicationStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | ``$STRING`` |  |
| `application_type` | ``$STRING`` |  |
| `last_updated` | ``$STRING`` |  |
| `nid_number` | ``$STRING`` |  |
| `remark` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `submission_date` | ``$STRING`` |  |

#### Example: Load

```ts
const application_status = await client.ApplicationStatus().load({ id: 'application_status_id' })
```


### Login

Create an instance: `const login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captcha` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `password` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |
| `token` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |
| `username` | ``$STRING`` |  |

#### Example: Create

```ts
const login = await client.Login().create({
  captcha: /* `$STRING` */,
  password: /* `$STRING` */,
  username: /* `$STRING` */,
})
```


### NidManagement

Create an instance: `const nid_management = client.NidManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const nid_management = await client.NidManagement().load({ id: 'nid_management_id' })
```


### Registration

Create an instance: `const registration = client.Registration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirm_password` | ``$STRING`` |  |
| `date_of_birth` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `nid_number` | ``$STRING`` |  |
| `password` | ``$STRING`` |  |
| `phone` | ``$STRING`` |  |

#### Example: Create

```ts
const registration = await client.Registration().create({
  confirm_password: /* `$STRING` */,
  email: /* `$STRING` */,
  nid_number: /* `$STRING` */,
  password: /* `$STRING` */,
})
```


### Success

Create an instance: `const success = client.Success()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `is_oversea` | ``$BOOLEAN`` |  |
| `message` | ``$STRING`` |  |
| `nid_number` | ``$STRING`` |  |
| `success` | ``$BOOLEAN`` |  |

#### Example: Create

```ts
const success = await client.Success().create({
  code: /* `$STRING` */,
  email: /* `$STRING` */,
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
nid-application-system/
├── src/
│   ├── NidApplicationSystemSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { NidApplicationSystemSDK } from 'nid-application-system'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

# NidApplicationSystem Lua SDK



The Lua SDK for the NidApplicationSystem API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Application()` — each with the same small set of operations (`load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/nid-application-system-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("nid-application-system_sdk")

local client = sdk.new({
  apikey = os.getenv("NID_APPLICATION_SYSTEM_APIKEY"),
})
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Application():create({ nid_number = "example_nid_number", reason = "example_reason" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local applicationstatus, err = client:ApplicationStatus():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ApplicationStatus():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE
NID_APPLICATION_SYSTEM_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### NidApplicationSystemSDK

```lua
local sdk = require("nid-application-system_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### NidApplicationSystemSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Application` | `(data) -> ApplicationEntity` | Create an Application entity instance. |
| `ApplicationStatus` | `(data) -> ApplicationStatusEntity` | Create an ApplicationStatus entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `NidManagement` | `(data) -> NidManagementEntity` | Create a NidManagement entity instance. |
| `Registration` | `(data) -> RegistrationEntity` | Create a Registration entity instance. |
| `Success` | `(data) -> SuccessEntity` | Create a Success entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local application, err = client:Application():load()
    if err then error(err) end
    -- application is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `additional_info` |  |
| `nid_number` |  |
| `police_report_number` |  |
| `reason` |  |

Operations: Create.

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

Operations: Load.

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

Operations: Create.

API path: `/auth/login`

#### NidManagement

| Field | Description |
| --- | --- |

Operations: Load.

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

Operations: Create.

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

Operations: Create.

API path: `/auth/password-reset`



## Entities


### Application

Create an instance: `local application = client:Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_info` | `string` |  |
| `nid_number` | `string` |  |
| `police_report_number` | `string` |  |
| `reason` | `string` |  |

#### Example: Create

```lua
local application, err = client:Application():create({
  nid_number = "example_nid_number", -- string
  reason = "example_reason", -- string
})
```


### ApplicationStatus

Create an instance: `local application_status = client:ApplicationStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `string` |  |
| `application_type` | `string` |  |
| `last_updated` | `string` |  |
| `nid_number` | `string` |  |
| `remark` | `string` |  |
| `status` | `string` |  |
| `submission_date` | `string` |  |

#### Example: Load

```lua
local application_status, err = client:ApplicationStatus():load({ id = "application_status_id" })
```


### Login

Create an instance: `local login = client:Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captcha` | `string` |  |
| `expires_in` | `number` |  |
| `password` | `string` |  |
| `success` | `boolean` |  |
| `token` | `string` |  |
| `user` | `table` |  |
| `username` | `string` |  |

#### Example: Create

```lua
local login, err = client:Login():create({
  captcha = "example_captcha", -- string
  password = "example_password", -- string
  username = "example_username", -- string
})
```


### NidManagement

Create an instance: `local nid_management = client:NidManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local nid_management, err = client:NidManagement():load()
```


### Registration

Create an instance: `local registration = client:Registration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirm_password` | `string` |  |
| `date_of_birth` | `string` |  |
| `email` | `string` |  |
| `nid_number` | `string` |  |
| `password` | `string` |  |
| `phone` | `string` |  |

#### Example: Create

```lua
local registration, err = client:Registration():create({
  confirm_password = "example_confirm_password", -- string
  email = "example_email", -- string
  nid_number = "example_nid_number", -- string
  password = "example_password", -- string
})
```


### Success

Create an instance: `local success = client:Success(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `email` | `string` |  |
| `is_oversea` | `boolean` |  |
| `message` | `string` |  |
| `nid_number` | `string` |  |
| `success` | `boolean` |  |

#### Example: Create

```lua
local success, err = client:Success():create({
  code = "example_code", -- string
  email = "example_email", -- string
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── nid-application-system_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`nid-application-system_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local applicationstatus = client:ApplicationStatus()
applicationstatus:load({ id = "example_id" })

-- applicationstatus:data_get() now returns the applicationstatus data from the last load
-- applicationstatus:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

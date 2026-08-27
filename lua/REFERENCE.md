# NidApplicationSystem Lua SDK Reference

Complete API reference for the NidApplicationSystem Lua SDK.


## NidApplicationSystemSDK

### Constructor

```lua
local sdk = require("nid-application-system_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Application(data)`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationStatus(data)`

Create a new `ApplicationStatus` entity instance. Pass `nil` for no initial data.

#### `Login(data)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `NidManagement(data)`

Create a new `NidManagement` entity instance. Pass `nil` for no initial data.

#### `Registration(data)`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `Success(data)`

Create a new `Success` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ApplicationEntity

```lua
local application = client:Application(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additionalInfo` | `string` | No | Additional information |
| `nidNumber` | `string` | Yes | National Identity Card number |
| `policeReportNumber` | `string` | No | Police report number (if lost or stolen) |
| `reason` | `string` | Yes | Reason for requesting duplicate |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Application():create({
  nidNumber = --[[ string ]],
  reason = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ApplicationStatusEntity

```lua
local application_status = client:ApplicationStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicationId` | `string` | No |  |
| `applicationType` | `string` | No |  |
| `id` | `string` | No |  |
| `lastUpdated` | `string` | No |  |
| `nidNumber` | `string` | No | NID number (if approved) |
| `remarks` | `string` | No | Additional remarks or notes |
| `status` | `string` | No |  |
| `submissionDate` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ApplicationStatus():load({ id = "application_status_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LoginEntity

```lua
local login = client:Login(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountStatus` | `string` | No |  |
| `captcha` | `string` | Yes | Captcha code displayed in the image |
| `email` | `string` | No |  |
| `fullName` | `string` | No |  |
| `nidNumber` | `string` | No |  |
| `password` | `string` | Yes | User's password |
| `phone` | `string` | No |  |
| `userId` | `string` | No |  |
| `username` | `string` | Yes | User's username or NID number |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Login():create({
  captcha = --[[ string ]],
  password = --[[ string ]],
  username = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## NidManagementEntity

```lua
local nid_management = client:NidManagement(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:NidManagement():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RegistrationEntity

```lua
local registration = client:Registration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirmPassword` | `string` | Yes | Password confirmation |
| `dateOfBirth` | `string` | No | Date of birth |
| `email` | `string` | Yes | User's email address |
| `nidNumber` | `string` | Yes | National Identity Card number |
| `password` | `string` | Yes | Account password |
| `phone` | `string` | No | User's phone number |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Registration():create({
  confirmPassword = --[[ string ]],
  email = --[[ string ]],
  nidNumber = --[[ string ]],
  password = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SuccessEntity

```lua
local success = client:Success(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes | Verification code received |
| `email` | `string` | Yes | Registered email address |
| `isOverseas` | `boolean` | No | Indicates if user is an overseas Bangladeshi |
| `message` | `string` | No |  |
| `nidNumber` | `string` | No | National Identity Card number for verification |
| `success` | `boolean` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Success():create({
  code = --[[ string ]],
  email = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuccessEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```


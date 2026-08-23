# NidApplicationSystem Ruby SDK Reference

Complete API reference for the NidApplicationSystem Ruby SDK.


## NidApplicationSystemSDK

### Constructor

```ruby
require_relative 'NidApplicationSystem_sdk'

client = NidApplicationSystemSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NidApplicationSystemSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = NidApplicationSystemSDK.test
```


### Instance Methods

#### `Application(data = nil)`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationStatus(data = nil)`

Create a new `ApplicationStatus` entity instance. Pass `nil` for no initial data.

#### `Login(data = nil)`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `NidManagement(data = nil)`

Create a new `NidManagement` entity instance. Pass `nil` for no initial data.

#### `Registration(data = nil)`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `Success(data = nil)`

Create a new `Success` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ApplicationEntity

```ruby
application = client.Application
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additionalInfo` | `String` | No | Additional information |
| `nidNumber` | `String` | Yes | National Identity Card number |
| `policeReportNumber` | `String` | No | Police report number (if lost or stolen) |
| `reason` | `String` | Yes | Reason for requesting duplicate |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Application.create({
  "nidNumber" => "example_nidNumber", # String
  "reason" => "example_reason", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ApplicationStatusEntity

```ruby
application_status = client.ApplicationStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicationId` | `String` | No |  |
| `applicationType` | `String` | No |  |
| `lastUpdated` | `String` | No |  |
| `nidNumber` | `String` | No | NID number (if approved) |
| `remarks` | `String` | No | Additional remarks or notes |
| `status` | `String` | No |  |
| `submissionDate` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ApplicationStatus.load({ "id" => "application_status_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LoginEntity

```ruby
login = client.Login
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accountStatus` | `String` | No |  |
| `captcha` | `String` | Yes | Captcha code displayed in the image |
| `email` | `String` | No |  |
| `fullName` | `String` | No |  |
| `nidNumber` | `String` | No |  |
| `password` | `String` | Yes | User's password |
| `phone` | `String` | No |  |
| `userId` | `String` | No |  |
| `username` | `String` | Yes | User's username or NID number |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Login.create({
  "captcha" => "example_captcha", # String
  "password" => "example_password", # String
  "username" => "example_username", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## NidManagementEntity

```ruby
nid_management = client.NidManagement
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.NidManagement.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RegistrationEntity

```ruby
registration = client.Registration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirmPassword` | `String` | Yes | Password confirmation |
| `dateOfBirth` | `String` | No | Date of birth |
| `email` | `String` | Yes | User's email address |
| `nidNumber` | `String` | Yes | National Identity Card number |
| `password` | `String` | Yes | Account password |
| `phone` | `String` | No | User's phone number |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Registration.create({
  "confirmPassword" => "example_confirmPassword", # String
  "email" => "example_email", # String
  "nidNumber" => "example_nidNumber", # String
  "password" => "example_password", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SuccessEntity

```ruby
success = client.Success
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `String` | Yes | Verification code received |
| `email` | `String` | Yes | Registered email address |
| `isOverseas` | `Boolean` | No | Indicates if user is an overseas Bangladeshi |
| `message` | `String` | No |  |
| `nidNumber` | `String` | No | National Identity Card number for verification |
| `success` | `Boolean` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Success.create({
  "code" => "example_code", # String
  "email" => "example_email", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SuccessEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = NidApplicationSystemSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


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
| `additional_info` | `String` | No |  |
| `nid_number` | `String` | Yes |  |
| `police_report_number` | `String` | No |  |
| `reason` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Application.create({
  "nid_number" => "example", # String
  "reason" => "example", # String
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
| `application_id` | `String` | No |  |
| `application_type` | `String` | No |  |
| `last_updated` | `String` | No |  |
| `nid_number` | `String` | No |  |
| `remark` | `String` | No |  |
| `status` | `String` | No |  |
| `submission_date` | `String` | No |  |

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
| `captcha` | `String` | Yes |  |
| `expires_in` | `Integer` | No |  |
| `password` | `String` | Yes |  |
| `success` | `Boolean` | No |  |
| `token` | `String` | No |  |
| `user` | `Hash` | No |  |
| `username` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Login.create({
  "captcha" => "example", # String
  "password" => "example", # String
  "username" => "example", # String
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
| `confirm_password` | `String` | Yes |  |
| `date_of_birth` | `String` | No |  |
| `email` | `String` | Yes |  |
| `nid_number` | `String` | Yes |  |
| `password` | `String` | Yes |  |
| `phone` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Registration.create({
  "confirm_password" => "example", # String
  "email" => "example", # String
  "nid_number" => "example", # String
  "password" => "example", # String
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
| `code` | `String` | Yes |  |
| `email` | `String` | Yes |  |
| `is_oversea` | `Boolean` | No |  |
| `message` | `String` | No |  |
| `nid_number` | `String` | No |  |
| `success` | `Boolean` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Success.create({
  "code" => "example", # String
  "email" => "example", # String
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


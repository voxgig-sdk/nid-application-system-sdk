# NidApplicationSystem Golang SDK Reference

Complete API reference for the NidApplicationSystem Golang SDK.


## NidApplicationSystemSDK

### Constructor

```go
func NewNidApplicationSystemSDK(options map[string]any) *NidApplicationSystemSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *NidApplicationSystemSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *NidApplicationSystemSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Application(data map[string]any) NidApplicationSystemEntity`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `ApplicationStatus(data map[string]any) NidApplicationSystemEntity`

Create a new `ApplicationStatus` entity instance. Pass `nil` for no initial data.

#### `Login(data map[string]any) NidApplicationSystemEntity`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `NidManagement(data map[string]any) NidApplicationSystemEntity`

Create a new `NidManagement` entity instance. Pass `nil` for no initial data.

#### `Registration(data map[string]any) NidApplicationSystemEntity`

Create a new `Registration` entity instance. Pass `nil` for no initial data.

#### `Success(data map[string]any) NidApplicationSystemEntity`

Create a new `Success` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ApplicationEntity

```go
application := client.Application(nil)
fmt.Println(application.GetName()) // "application"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_info` | `string` | No |  |
| `nid_number` | `string` | Yes |  |
| `police_report_number` | `string` | No |  |
| `reason` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Application(nil).Create(map[string]any{
    "nid_number": "example_nid_number",
    "reason": "example_reason",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ApplicationStatusEntity

```go
applicationStatus := client.ApplicationStatus(nil)
fmt.Println(applicationStatus.GetName()) // "application_status"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | `string` | No |  |
| `application_type` | `string` | No |  |
| `last_updated` | `string` | No |  |
| `nid_number` | `string` | No |  |
| `remark` | `string` | No |  |
| `status` | `string` | No |  |
| `submission_date` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ApplicationStatus(nil).Load(map[string]any{"id": "application_status_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LoginEntity

```go
login := client.Login(nil)
fmt.Println(login.GetName()) // "login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captcha` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `password` | `string` | Yes |  |
| `success` | `bool` | No |  |
| `token` | `string` | No |  |
| `user` | `map[string]any` | No |  |
| `username` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Login(nil).Create(map[string]any{
    "captcha": "example_captcha",
    "password": "example_password",
    "username": "example_username",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## NidManagementEntity

```go
nidManagement := client.NidManagement(nil)
fmt.Println(nidManagement.GetName()) // "nid_management"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.NidManagement(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RegistrationEntity

```go
registration := client.Registration(nil)
fmt.Println(registration.GetName()) // "registration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirm_password` | `string` | Yes |  |
| `date_of_birth` | `string` | No |  |
| `email` | `string` | Yes |  |
| `nid_number` | `string` | Yes |  |
| `password` | `string` | Yes |  |
| `phone` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Registration(nil).Create(map[string]any{
    "confirm_password": "example_confirm_password",
    "email": "example_email",
    "nid_number": "example_nid_number",
    "password": "example_password",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SuccessEntity

```go
success := client.Success(nil)
fmt.Println(success.GetName()) // "success"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `is_oversea` | `bool` | No |  |
| `message` | `string` | No |  |
| `nid_number` | `string` | No |  |
| `success` | `bool` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Success(nil).Create(map[string]any{
    "code": "example_code",
    "email": "example_email",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SuccessEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewNidApplicationSystemSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```


# NidApplicationSystem Golang SDK



The Golang SDK for the NidApplicationSystem API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/nid-application-system-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/nid-application-system-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/nid-application-system-sdk/go=../nid-application-system-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/nid-application-system-sdk/go"
    "github.com/voxgig-sdk/nid-application-system-sdk/go/core"
)

func main() {
    client := sdk.NewNidApplicationSystemSDK(map[string]any{
        "apikey": os.Getenv("NID_APPLICATION_SYSTEM_APIKEY"),
    })
```

### 4. Create, update, and remove

```go
// Create
created, _ := client.Application(nil).Create(
    map[string]any{"name": "Example"}, nil,
)
cm := core.ToMapAny(created)
newID := core.ToMapAny(cm["data"])["id"]

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

result, err := client.Application(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewNidApplicationSystemSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewNidApplicationSystemSDK

```go
func NewNidApplicationSystemSDK(options map[string]any) *NidApplicationSystemSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *NidApplicationSystemSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### NidApplicationSystemSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Application` | `(data map[string]any) NidApplicationSystemEntity` | Create a Application entity instance. |
| `ApplicationStatus` | `(data map[string]any) NidApplicationSystemEntity` | Create a ApplicationStatus entity instance. |
| `Login` | `(data map[string]any) NidApplicationSystemEntity` | Create a Login entity instance. |
| `NidManagement` | `(data map[string]any) NidApplicationSystemEntity` | Create a NidManagement entity instance. |
| `Registration` | `(data map[string]any) NidApplicationSystemEntity` | Create a Registration entity instance. |
| `Success` | `(data map[string]any) NidApplicationSystemEntity` | Create a Success entity instance. |

### Entity interface (NidApplicationSystemEntity)

All entities implement the `NidApplicationSystemEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Application

| Field | Description |
| --- | --- |
| `"additional_info"` |  |
| `"nid_number"` |  |
| `"police_report_number"` |  |
| `"reason"` |  |

Operations: Create.

API path: `/application/correction`

#### ApplicationStatus

| Field | Description |
| --- | --- |
| `"application_id"` |  |
| `"application_type"` |  |
| `"last_updated"` |  |
| `"nid_number"` |  |
| `"remark"` |  |
| `"status"` |  |
| `"submission_date"` |  |

Operations: Load.

API path: `/application/status/{applicationId}`

#### Login

| Field | Description |
| --- | --- |
| `"captcha"` |  |
| `"expires_in"` |  |
| `"password"` |  |
| `"success"` |  |
| `"token"` |  |
| `"user"` |  |
| `"username"` |  |

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
| `"confirm_password"` |  |
| `"date_of_birth"` |  |
| `"email"` |  |
| `"nid_number"` |  |
| `"password"` |  |
| `"phone"` |  |

Operations: Create.

API path: `/auth/register`

#### Success

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"email"` |  |
| `"is_oversea"` |  |
| `"message"` |  |
| `"nid_number"` |  |
| `"success"` |  |

Operations: Create.

API path: `/auth/password-reset`



## Entities


### Application

Create an instance: `application := client.Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_info` | ``$STRING`` |  |
| `nid_number` | ``$STRING`` |  |
| `police_report_number` | ``$STRING`` |  |
| `reason` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.Application(nil).Create(map[string]any{
    "nid_number": /* `$STRING` */,
    "reason": /* `$STRING` */,
}, nil)
```


### ApplicationStatus

Create an instance: `application_status := client.ApplicationStatus(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.ApplicationStatus(nil).Load(map[string]any{"id": "application_status_id"}, nil)
```


### Login

Create an instance: `login := client.Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.Login(nil).Create(map[string]any{
    "captcha": /* `$STRING` */,
    "password": /* `$STRING` */,
    "username": /* `$STRING` */,
}, nil)
```


### NidManagement

Create an instance: `nid_management := client.NidManagement(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.NidManagement(nil).Load(map[string]any{"id": "nid_management_id"}, nil)
```


### Registration

Create an instance: `registration := client.Registration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.Registration(nil).Create(map[string]any{
    "confirm_password": /* `$STRING` */,
    "email": /* `$STRING` */,
    "nid_number": /* `$STRING` */,
    "password": /* `$STRING` */,
}, nil)
```


### Success

Create an instance: `success := client.Success(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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

```go
result, err := client.Success(nil).Create(map[string]any{
    "code": /* `$STRING` */,
    "email": /* `$STRING` */,
}, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/nid-application-system-sdk/go/
├── nid-application-system.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/nid-application-system-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
application := client.Application(nil)
application.Load(map[string]any{"id": "example_id"}, nil)

// application.Data() now returns the loaded application data
// application.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

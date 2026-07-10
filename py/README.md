# NidApplicationSystem Python SDK



The Python SDK for the NidApplicationSystem API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Application()` — each
carrying a small, uniform set of operations (`load`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/nid-application-system-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from nidapplicationsystem_sdk import NidApplicationSystemSDK

client = NidApplicationSystemSDK({
    "apikey": os.environ.get("NID_APPLICATION_SYSTEM_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.Application().create({"nid_number": "example_nid_number", "reason": "example_reason"})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    applicationstatus = client.ApplicationStatus().load({"id": "example_id"})
    print(applicationstatus)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = NidApplicationSystemSDK.test()

# Entity ops return the bare record and raise on error.
applicationstatus = client.ApplicationStatus().load({"id": "test01"})
# applicationstatus contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = NidApplicationSystemSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### NidApplicationSystemSDK

```python
from nidapplicationsystem_sdk import NidApplicationSystemSDK

client = NidApplicationSystemSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = NidApplicationSystemSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### NidApplicationSystemSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `application = client.Application()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `additional_info` | `str` |  |
| `nid_number` | `str` |  |
| `police_report_number` | `str` |  |
| `reason` | `str` |  |

#### Example: Create

```python
application = client.Application().create({
    "nid_number": "example_nid_number",  # str
    "reason": "example_reason",  # str
})
```


### ApplicationStatus

Create an instance: `application_status = client.ApplicationStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `application_id` | `str` |  |
| `application_type` | `str` |  |
| `last_updated` | `str` |  |
| `nid_number` | `str` |  |
| `remark` | `str` |  |
| `status` | `str` |  |
| `submission_date` | `str` |  |

#### Example: Load

```python
application_status = client.ApplicationStatus().load({"id": "application_status_id"})
```


### Login

Create an instance: `login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captcha` | `str` |  |
| `expires_in` | `int` |  |
| `password` | `str` |  |
| `success` | `bool` |  |
| `token` | `str` |  |
| `user` | `dict` |  |
| `username` | `str` |  |

#### Example: Create

```python
login = client.Login().create({
    "captcha": "example_captcha",  # str
    "password": "example_password",  # str
    "username": "example_username",  # str
})
```


### NidManagement

Create an instance: `nid_management = client.NidManagement()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
nid_management = client.NidManagement().load()
```


### Registration

Create an instance: `registration = client.Registration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirm_password` | `str` |  |
| `date_of_birth` | `str` |  |
| `email` | `str` |  |
| `nid_number` | `str` |  |
| `password` | `str` |  |
| `phone` | `str` |  |

#### Example: Create

```python
registration = client.Registration().create({
    "confirm_password": "example_confirm_password",  # str
    "email": "example_email",  # str
    "nid_number": "example_nid_number",  # str
    "password": "example_password",  # str
})
```


### Success

Create an instance: `success = client.Success()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` |  |
| `email` | `str` |  |
| `is_oversea` | `bool` |  |
| `message` | `str` |  |
| `nid_number` | `str` |  |
| `success` | `bool` |  |

#### Example: Create

```python
success = client.Success().create({
    "code": "example_code",  # str
    "email": "example_email",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── nidapplicationsystem_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`nidapplicationsystem_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
applicationstatus = client.ApplicationStatus()
applicationstatus.load({"id": "example_id"})

# applicationstatus.data_get() now returns the applicationstatus data from the last load
# applicationstatus.match_get() returns the last match criteria
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

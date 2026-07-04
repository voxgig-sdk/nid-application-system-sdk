# NidApplicationSystem PHP SDK



The PHP SDK for the NidApplicationSystem API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/nid-application-system-sdk/releases](https://github.com/voxgig-sdk/nid-application-system-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'nidapplicationsystem_sdk.php';

$client = new NidApplicationSystemSDK([
    "apikey" => getenv("NID_APPLICATION_SYSTEM_APIKEY"),
]);
```

### 4. Create, update, and remove

```php
// create() returns the bare created Application record.
$created = $client->Application()->create(["name" => "Example"]);

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = NidApplicationSystemSDK::test([
    "entity" => ["application" => ["test01" => ["id" => "test01"]]],
]);

// load() returns the bare mock record (throws on error).
$application = $client->Application()->load(["id" => "test01"]);
print_r($application);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new NidApplicationSystemSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
NID_APPLICATION_SYSTEM_TEST_LIVE=TRUE
NID_APPLICATION_SYSTEM_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### NidApplicationSystemSDK

```php
require_once 'nidapplicationsystem_sdk.php';
$client = new NidApplicationSystemSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = NidApplicationSystemSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### NidApplicationSystemSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Application` | `($data): ApplicationEntity` | Create an Application entity instance. |
| `ApplicationStatus` | `($data): ApplicationStatusEntity` | Create an ApplicationStatus entity instance. |
| `Login` | `($data): LoginEntity` | Create a Login entity instance. |
| `NidManagement` | `($data): NidManagementEntity` | Create a NidManagement entity instance. |
| `Registration` | `($data): RegistrationEntity` | Create a Registration entity instance. |
| `Success` | `($data): SuccessEntity` | Create a Success entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$application = $client->Application();`

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

```php
$application = $client->Application()->create([
    "nid_number" => null, // `$STRING`
    "reason" => null, // `$STRING`
]);
```


### ApplicationStatus

Create an instance: `$application_status = $client->ApplicationStatus();`

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

```php
// load() returns the bare ApplicationStatus record (throws on error).
$application_status = $client->ApplicationStatus()->load(["id" => "application_status_id"]);
```


### Login

Create an instance: `$login = $client->Login();`

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

```php
$login = $client->Login()->create([
    "captcha" => null, // `$STRING`
    "password" => null, // `$STRING`
    "username" => null, // `$STRING`
]);
```


### NidManagement

Create an instance: `$nid_management = $client->NidManagement();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare NidManagement record (throws on error).
$nid_management = $client->NidManagement()->load(["id" => "nid_management_id"]);
```


### Registration

Create an instance: `$registration = $client->Registration();`

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

```php
$registration = $client->Registration()->create([
    "confirm_password" => null, // `$STRING`
    "email" => null, // `$STRING`
    "nid_number" => null, // `$STRING`
    "password" => null, // `$STRING`
]);
```


### Success

Create an instance: `$success = $client->Success();`

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

```php
$success = $client->Success()->create([
    "code" => null, // `$STRING`
    "email" => null, // `$STRING`
]);
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── nidapplicationsystem_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`nidapplicationsystem_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$application = $client->Application();
$application->load(["id" => "example_id"]);

// $application->dataGet() now returns the loaded application data
// $application->matchGet() returns the last match criteria
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

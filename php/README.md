# NidApplicationSystem PHP SDK

The PHP SDK for the NidApplicationSystem API. Provides an entity-oriented interface using PHP conventions.


## Install
```bash
composer require voxgig/nid-application-system-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'nidapplicationsystem_sdk.php';

$client = new NidApplicationSystemSDK([]);
```

### 4. Create, update, and remove

```php
// Create
[$created, $_] = $client->Application(null)->create(["name" => "Example"], null);

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
}
```

### Prepare a request without sending it

```php
[$fetchdef, $err] = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);
if ($err) { throw new \Exception($err); }

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = NidApplicationSystemSDK::test(null, null);

[$result, $err] = $client->NidApplicationSystem(null)->load(
    ["id" => "test01"], null
);
// $result contains mock response data
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
NID-APPLICATION-SYSTEM_TEST_LIVE=TRUE
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
| `Application` | `($data): ApplicationEntity` | Create a Application entity instance. |
| `ApplicationStatus` | `($data): ApplicationStatusEntity` | Create a ApplicationStatus entity instance. |
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

Entity operations return `[$result, $err]`. The first value is an
`array` with these keys:

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
$moon = $client->Moon();
[$result, $err] = $moon->load(["planet_id" => "earth", "id" => "luna"]);

// $moon->dataGet() now returns the loaded moon data
// $moon->matchGet() returns the last match criteria
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

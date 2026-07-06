# NidApplicationSystem PHP SDK Reference

Complete API reference for the NidApplicationSystem PHP SDK.


## NidApplicationSystemSDK

### Constructor

```php
require_once __DIR__ . '/nidapplicationsystem_sdk.php';

$client = new NidApplicationSystemSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NidApplicationSystemSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = NidApplicationSystemSDK::test();
```


### Instance Methods

#### `Application($data = null)`

Create a new `ApplicationEntity` instance. Pass `null` for no initial data.

#### `ApplicationStatus($data = null)`

Create a new `ApplicationStatusEntity` instance. Pass `null` for no initial data.

#### `Login($data = null)`

Create a new `LoginEntity` instance. Pass `null` for no initial data.

#### `NidManagement($data = null)`

Create a new `NidManagementEntity` instance. Pass `null` for no initial data.

#### `Registration($data = null)`

Create a new `RegistrationEntity` instance. Pass `null` for no initial data.

#### `Success($data = null)`

Create a new `SuccessEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): NidApplicationSystemUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ApplicationEntity

```php
$application = $client->Application();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_info` | `string` | No |  |
| `nid_number` | `string` | Yes |  |
| `police_report_number` | `string` | No |  |
| `reason` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Application()->create([
  "nid_number" => null, // string
  "reason" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApplicationEntity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ApplicationStatusEntity

```php
$application_status = $client->ApplicationStatus();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ApplicationStatus()->load(["id" => "application_status_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ApplicationStatusEntity`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LoginEntity

```php
$login = $client->Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captcha` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `password` | `string` | Yes |  |
| `success` | `bool` | No |  |
| `token` | `string` | No |  |
| `user` | `array` | No |  |
| `username` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Login()->create([
  "captcha" => null, // string
  "password" => null, // string
  "username" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LoginEntity`

Create a new `LoginEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NidManagementEntity

```php
$nid_management = $client->NidManagement();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->NidManagement()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NidManagementEntity`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RegistrationEntity

```php
$registration = $client->Registration();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Registration()->create([
  "confirm_password" => null, // string
  "email" => null, // string
  "nid_number" => null, // string
  "password" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RegistrationEntity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SuccessEntity

```php
$success = $client->Success();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Success()->create([
  "code" => null, // string
  "email" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SuccessEntity`

Create a new `SuccessEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new NidApplicationSystemSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


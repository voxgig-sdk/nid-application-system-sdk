# NidApplicationSystem PHP SDK Reference

Complete API reference for the NidApplicationSystem PHP SDK.


## NidApplicationSystemSDK

### Constructor

```php
require_once __DIR__ . '/nid-application-system_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
| `additional_info` | ``$STRING`` | No |  |
| `nid_number` | ``$STRING`` | Yes |  |
| `police_report_number` | ``$STRING`` | No |  |
| `reason` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Application()->create([
  "nid_number" => /* `$STRING` */,
  "reason" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ApplicationEntity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ApplicationStatusEntity

```php
$application_status = $client->ApplicationStatus();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `application_id` | ``$STRING`` | No |  |
| `application_type` | ``$STRING`` | No |  |
| `last_updated` | ``$STRING`` | No |  |
| `nid_number` | ``$STRING`` | No |  |
| `remark` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `submission_date` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ApplicationStatus()->load(["id" => "application_status_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ApplicationStatusEntity`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LoginEntity

```php
$login = $client->Login();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captcha` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | No |  |
| `password` | ``$STRING`` | Yes |  |
| `success` | ``$BOOLEAN`` | No |  |
| `token` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |
| `username` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Login()->create([
  "captcha" => /* `$STRING` */,
  "password" => /* `$STRING` */,
  "username" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LoginEntity`

Create a new `LoginEntity` instance with the same client and
options.

#### `getName(): string`

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
$result = $client->NidManagement()->load(["id" => "nid_management_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): NidManagementEntity`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## RegistrationEntity

```php
$registration = $client->Registration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirm_password` | ``$STRING`` | Yes |  |
| `date_of_birth` | ``$STRING`` | No |  |
| `email` | ``$STRING`` | Yes |  |
| `nid_number` | ``$STRING`` | Yes |  |
| `password` | ``$STRING`` | Yes |  |
| `phone` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Registration()->create([
  "confirm_password" => /* `$STRING` */,
  "email" => /* `$STRING` */,
  "nid_number" => /* `$STRING` */,
  "password" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): RegistrationEntity`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SuccessEntity

```php
$success = $client->Success();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | Yes |  |
| `is_oversea` | ``$BOOLEAN`` | No |  |
| `message` | ``$STRING`` | No |  |
| `nid_number` | ``$STRING`` | No |  |
| `success` | ``$BOOLEAN`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Success()->create([
  "code" => /* `$STRING` */,
  "email" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SuccessEntity`

Create a new `SuccessEntity` instance with the same client and
options.

#### `getName(): string`

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


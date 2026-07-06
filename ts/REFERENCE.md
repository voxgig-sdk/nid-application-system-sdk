# NidApplicationSystem TypeScript SDK Reference

Complete API reference for the NidApplicationSystem TypeScript SDK.


## NidApplicationSystemSDK

### Constructor

```ts
new NidApplicationSystemSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NidApplicationSystemSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = NidApplicationSystemSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `NidApplicationSystemSDK` instance in test mode.


### Instance Methods

#### `Application(data?: object)`

Create a new `Application` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationEntity` instance.

#### `ApplicationStatus(data?: object)`

Create a new `ApplicationStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationStatusEntity` instance.

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `NidManagement(data?: object)`

Create a new `NidManagement` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `NidManagementEntity` instance.

#### `Registration(data?: object)`

Create a new `Registration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RegistrationEntity` instance.

#### `Success(data?: object)`

Create a new `Success` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SuccessEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `NidApplicationSystemSDK.test()`.

**Returns:** `NidApplicationSystemSDK` instance in test mode.


---

## ApplicationEntity

```ts
const application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_info` | `string` | No |  |
| `nid_number` | `string` | Yes |  |
| `police_report_number` | `string` | No |  |
| `reason` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Application().create({
  nid_number: /* string */,
  reason: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApplicationStatusEntity

```ts
const application_status = client.ApplicationStatus()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ApplicationStatus().load({ id: 'application_status_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoginEntity

```ts
const login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captcha` | `string` | Yes |  |
| `expires_in` | `number` | No |  |
| `password` | `string` | Yes |  |
| `success` | `boolean` | No |  |
| `token` | `string` | No |  |
| `user` | `Record<string, any>` | No |  |
| `username` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Login().create({
  captcha: /* string */,
  password: /* string */,
  username: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## NidManagementEntity

```ts
const nid_management = client.NidManagement()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.NidManagement().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `NidManagementEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RegistrationEntity

```ts
const registration = client.Registration()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Registration().create({
  confirm_password: /* string */,
  email: /* string */,
  nid_number: /* string */,
  password: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RegistrationEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SuccessEntity

```ts
const success = client.Success()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | Yes |  |
| `email` | `string` | Yes |  |
| `is_oversea` | `boolean` | No |  |
| `message` | `string` | No |  |
| `nid_number` | `string` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Success().create({
  code: /* string */,
  email: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SuccessEntity` instance with the same client and
options.

#### `client()`

Return the parent `NidApplicationSystemSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new NidApplicationSystemSDK({
  feature: {
    test: { active: true },
  }
})
```


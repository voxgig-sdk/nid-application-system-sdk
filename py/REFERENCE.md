# NidApplicationSystem Python SDK Reference

Complete API reference for the NidApplicationSystem Python SDK.


## NidApplicationSystemSDK

### Constructor

```python
from nid-application-system_sdk import NidApplicationSystemSDK

client = NidApplicationSystemSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NidApplicationSystemSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = NidApplicationSystemSDK.test()
```


### Instance Methods

#### `Application(data=None)`

Create a new `ApplicationEntity` instance. Pass `None` for no initial data.

#### `ApplicationStatus(data=None)`

Create a new `ApplicationStatusEntity` instance. Pass `None` for no initial data.

#### `Login(data=None)`

Create a new `LoginEntity` instance. Pass `None` for no initial data.

#### `NidManagement(data=None)`

Create a new `NidManagementEntity` instance. Pass `None` for no initial data.

#### `Registration(data=None)`

Create a new `RegistrationEntity` instance. Pass `None` for no initial data.

#### `Success(data=None)`

Create a new `SuccessEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ApplicationEntity

```python
application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `additional_info` | ``$STRING`` | No |  |
| `nid_number` | ``$STRING`` | Yes |  |
| `police_report_number` | ``$STRING`` | No |  |
| `reason` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Application().create({
    "nid_number": ...,  # `$STRING`
    "reason": ...,  # `$STRING`
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApplicationStatusEntity

```python
application_status = client.ApplicationStatus()
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ApplicationStatus().load({"id": "application_status_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LoginEntity

```python
login = client.Login()
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Login().create({
    "captcha": ...,  # `$STRING`
    "password": ...,  # `$STRING`
    "username": ...,  # `$STRING`
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## NidManagementEntity

```python
nid_management = client.NidManagement()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.NidManagement().load({"id": "nid_management_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `NidManagementEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RegistrationEntity

```python
registration = client.Registration()
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Registration().create({
    "confirm_password": ...,  # `$STRING`
    "email": ...,  # `$STRING`
    "nid_number": ...,  # `$STRING`
    "password": ...,  # `$STRING`
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RegistrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SuccessEntity

```python
success = client.Success()
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Success().create({
    "code": ...,  # `$STRING`
    "email": ...,  # `$STRING`
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuccessEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = NidApplicationSystemSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


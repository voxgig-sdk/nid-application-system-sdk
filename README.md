# NidApplicationSystem SDK

Register, log in and manage Bangladesh National ID (NID) applications via the Election Commission's public portal

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About NID Application System

The NID Application System is the public-facing service of the [Bangladesh Election Commission](https://services.nidw.gov.bd/nid-pub) for National Identity Card (NID) services. Citizens who already hold an NID can register an account to request corrections or duplicate copies, while those without an NID can apply for new registration. The portal also supports overseas Bangladeshis, who receive verification codes and notifications by email.

What you get from the API:

- Account registration and login flows for NID holders and new applicants
- Submission of new NID applications and tracking of their status
- NID management operations such as corrections and duplicate-copy requests
- Success / confirmation responses for completed actions

Operational notes: the service is provided directly by the Bangladesh Election Commission at `https://services.nidw.gov.bd/nid-pub`. Helpline 105 / +88 01708-5012261 and info@nidw.gov.bd are available Sunday-Thursday, 09:00-17:00 (Bangladesh time). No public licence, rate-limit or authentication scheme is documented; CORS is reported as disabled.

## Try it

**TypeScript**
```bash
npm install nid-application-system
```

**Python**
```bash
pip install nid-application-system-sdk
```

**PHP**
```bash
composer require voxgig/nid-application-system-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nid-application-system-sdk/go
```

**Ruby**
```bash
gem install nid-application-system-sdk
```

**Lua**
```bash
luarocks install nid-application-system-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NidApplicationSystemSDK } from 'nid-application-system'

const client = new NidApplicationSystemSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o nid-application-system-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nid-application-system": {
      "command": "/abs/path/to/nid-application-system-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Application** | Operations for submitting and working with an NID application record. | `/application/correction` |
| **ApplicationStatus** | Lookup of the current state of a submitted NID application. | `/application/status/{applicationId}` |
| **Login** | Sign-in flow for citizens who already have an NID portal account. | `/auth/login` |
| **NidManagement** | Post-issuance NID actions such as corrections and duplicate-copy requests. | `/nid/download` |
| **Registration** | New-account and new-NID registration flow, including the overseas-applicant path that uses email verification codes. | `/auth/register` |
| **Success** | Confirmation / success responses returned after a completed action. | `/auth/password-reset` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nidapplicationsystem_sdk import NidApplicationSystemSDK

client = NidApplicationSystemSDK({})

```

### PHP

```php
<?php
require_once 'nidapplicationsystem_sdk.php';

$client = new NidApplicationSystemSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/nid-application-system-sdk/go"

client := sdk.NewNidApplicationSystemSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "NidApplicationSystem_sdk"

client = NidApplicationSystemSDK.new({})

```

### Lua

```lua
local sdk = require("nid-application-system_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NidApplicationSystemSDK.test()
const result = await client.Application().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NidApplicationSystemSDK.test(None, None)
result, err = client.Application(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NidApplicationSystemSDK::test(null, null);
[$result, $err] = $client->Application(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Application(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NidApplicationSystemSDK.test(nil, nil)
result, err = client.Application(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Application(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the NID Application System

- Upstream: [https://services.nidw.gov.bd/nid-pub](https://services.nidw.gov.bd/nid-pub)
- API docs: [https://services.nidw.gov.bd/nid-pub/](https://services.nidw.gov.bd/nid-pub/)

---

Generated from the NID Application System OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

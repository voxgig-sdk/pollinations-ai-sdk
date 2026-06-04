# PollinationsAi SDK

Generate text and images from prompts via simple URL-based endpoints, no signup or API key required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Pollinations AI

[Pollinations AI](https://pollinations.ai) is an open-source generative AI platform based in Berlin that exposes text, image, audio and video generation through plain HTTP URLs. The project is community-driven, with infrastructure support from partners such as Perplexity AI, AWS, Google Cloud, Azure and Cloudflare, and powers a large ecosystem of community apps.

What you get from the API:

- Text generation by GET-ing a prompt path (e.g. `https://text.pollinations.ai/{prompt}`)
- Image generation by GET-ing a prompt path against the image host (e.g. `https://image.pollinations.ai/prompt/{prompt}`), which returns a generated image directly in the response
- A choice of underlying models (the image service in this SDK is reachable at `https://image.pollinations.ai`)

Operationally, the public endpoints work without authentication and with CORS enabled, so they can be called straight from a browser. Optional API keys are offered for higher-volume use: publishable keys are intended for client-side calls with per-IP quotas, secret keys for server-side use. Endpoints are URL-driven, so prompts and parameters are encoded into the path or query string rather than a JSON body.

## Try it

**TypeScript**
```bash
npm install pollinations-ai
```

**Python**
```bash
pip install pollinations-ai-sdk
```

**PHP**
```bash
composer require voxgig/pollinations-ai-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/pollinations-ai-sdk/go
```

**Ruby**
```bash
gem install pollinations-ai-sdk
```

**Lua**
```bash
luarocks install pollinations-ai-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PollinationsAiSDK } from 'pollinations-ai'

const client = new PollinationsAiSDK({})

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
cd go-mcp && go build -o pollinations-ai-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "pollinations-ai": {
      "command": "/abs/path/to/pollinations-ai-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GenerateText** | Prompt-to-text generation; the prompt is passed as a path segment (the text service lives at `text.pollinations.ai`, e.g. `GET /{prompt}`) and the response is the generated text. | `/` |
| **ImageGeneration** | Prompt-to-image generation hosted at `image.pollinations.ai`; requesting a prompt path returns a generated image as the HTTP response body. | `/prompt/{prompt}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from pollinationsai_sdk import PollinationsAiSDK

client = PollinationsAiSDK({})

```

### PHP

```php
<?php
require_once 'pollinationsai_sdk.php';

$client = new PollinationsAiSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/pollinations-ai-sdk/go"

client := sdk.NewPollinationsAiSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "PollinationsAi_sdk"

client = PollinationsAiSDK.new({})

```

### Lua

```lua
local sdk = require("pollinations-ai_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PollinationsAiSDK.test()
const result = await client.GenerateText().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PollinationsAiSDK.test(None, None)
result, err = client.GenerateText(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PollinationsAiSDK::test(null, null);
[$result, $err] = $client->GenerateText(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GenerateText(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PollinationsAiSDK.test(nil, nil)
result, err = client.GenerateText(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GenerateText(nil):load(
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

## Using the Pollinations AI

- Upstream: [https://pollinations.ai](https://pollinations.ai)
- API docs: [https://github.com/pollinations/pollinations](https://github.com/pollinations/pollinations)

- Pollinations is open source and released under the MIT licence
- No signup or API key is required for basic usage; CORS is enabled for in-browser calls
- Optional publishable (`pk_`) and secret (`sk_`) keys are available via `enter.pollinations.ai` for higher quotas
- Generated content is produced by upstream models; check the project README for any model-specific terms before commercial reuse

---

Generated from the Pollinations AI OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

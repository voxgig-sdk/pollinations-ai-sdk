# PollinationsAi PHP SDK Reference

Complete API reference for the PollinationsAi PHP SDK.


## PollinationsAiSDK

### Constructor

```php
require_once __DIR__ . '/pollinations-ai_sdk.php';

$client = new PollinationsAiSDK($options);
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

#### `PollinationsAiSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PollinationsAiSDK::test();
```


### Instance Methods

#### `GenerateText($data = null)`

Create a new `GenerateTextEntity` instance. Pass `null` for no initial data.

#### `ImageGeneration($data = null)`

Create a new `ImageGenerationEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## GenerateTextEntity

```php
$generate_text = $client->GenerateText();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choice` | ``$ARRAY`` | No |  |
| `created` | ``$INTEGER`` | No |  |
| `id` | ``$STRING`` | No |  |
| `max_token` | ``$INTEGER`` | No |  |
| `message` | ``$ARRAY`` | Yes |  |
| `model` | ``$STRING`` | No |  |
| `object` | ``$STRING`` | No |  |
| `seed` | ``$INTEGER`` | No |  |
| `temperature` | ``$NUMBER`` | No |  |
| `usage` | ``$OBJECT`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): array`

Create a new entity with the given data.

```php
[$result, $err] = $client->GenerateText()->create([
  "message" => /* `$ARRAY` */,
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

#### `make(): GenerateTextEntity`

Create a new `GenerateTextEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ImageGenerationEntity

```php
$image_generation = $client->ImageGeneration();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->ImageGeneration()->load(["id" => "image_generation_id"]);
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

#### `make(): ImageGenerationEntity`

Create a new `ImageGenerationEntity` instance with the same client and
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
$client = new PollinationsAiSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


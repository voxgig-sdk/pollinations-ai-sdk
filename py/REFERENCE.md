# PollinationsAi Python SDK Reference

Complete API reference for the PollinationsAi Python SDK.


## PollinationsAiSDK

### Constructor

```python
from pollinationsai_sdk import PollinationsAiSDK

client = PollinationsAiSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PollinationsAiSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = PollinationsAiSDK.test()
```


### Instance Methods

#### `GenerateText(data=None)`

Create a new `GenerateTextEntity` instance. Pass `None` for no initial data.

#### `ImageGeneration(data=None)`

Create a new `ImageGenerationEntity` instance. Pass `None` for no initial data.

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

## GenerateTextEntity

```python
generate_text = client.GenerateText()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `choices` | `list` | No |  |
| `created` | `int` | No | Unix timestamp of when the generation was created |
| `id` | `str` | No | Unique identifier for the generation |
| `max_tokens` | `int` | No | Maximum number of tokens to generate |
| `messages` | `list` | Yes | Array of message objects for the conversation |
| `model` | `str` | No | The model used for generation |
| `object` | `str` | No |  |
| `seed` | `int` | No | Seed for reproducible text generation |
| `temperature` | `float` | No | Controls randomness in generation (0.0 to 2.0) |
| `usage` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.GenerateText().create({
    "messages": [],  # list
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

Create a new `GenerateTextEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImageGenerationEntity

```python
image_generation = client.ImageGeneration()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ImageGeneration().load({"prompt": "prompt"})
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

Create a new `ImageGenerationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = PollinationsAiSDK({
    "feature": {
        "test": {"active": True},
    },
})
```


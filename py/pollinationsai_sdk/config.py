# PollinationsAi SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PollinationsAi",
            "slug": "pollinations-ai",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://image.pollinations.ai",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "generate_text": {},
                "image_generation": {},
            },
        },
        "entity": {
      "generate_text": {
        "fields": [
          {
            "name": "choices",
            "title": "Choices",
            "type": "`$ARRAY`",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$INTEGER`",
            "short": "Unix timestamp of when the generation was created",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "short": "Unique identifier for the generation",
          },
          {
            "name": "max_tokens",
            "title": "Max Tokens",
            "type": "`$INTEGER`",
            "short": "Maximum number of tokens to generate",
          },
          {
            "name": "messages",
            "title": "Messages",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Array of message objects for the conversation",
          },
          {
            "name": "model",
            "title": "Model",
            "type": "`$STRING`",
            "short": "The model used for generation",
          },
          {
            "name": "object",
            "title": "Object",
            "type": "`$STRING`",
          },
          {
            "name": "seed",
            "title": "Seed",
            "type": "`$INTEGER`",
            "short": "Seed for reproducible text generation",
          },
          {
            "name": "temperature",
            "title": "Temperature",
            "type": "`$NUMBER`",
            "short": "Controls randomness in generation (0.0 to 2.0)",
          },
          {
            "name": "usage",
            "title": "Usage",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "generate_text",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/",
                "segments": [],
                "parts": [],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "image_generation": {
        "fields": [],
        "name": "image_generation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/prompt/{prompt}",
                "segments": [
                  {
                    "lit": "prompt",
                  },
                  {
                    "var": "prompt",
                  },
                ],
                "parts": [
                  "prompt",
                  "{prompt}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "prompt",
                      "orig": "prompt",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "A beautiful sunset over mountains",
                    },
                  ],
                  "query": [
                    {
                      "name": "enhance",
                      "orig": "enhance",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "height",
                      "orig": "height",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1024,
                    },
                    {
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "flux",
                    },
                    {
                      "name": "nologo",
                      "orig": "nologo",
                      "type": "`$BOOLEAN`",
                      "kind": "query",
                      "example": False,
                    },
                    {
                      "name": "seed",
                      "orig": "seed",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "width",
                      "orig": "width",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 1024,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "prompt",
                  ],
                },
                "response": {
                  "alternatives": [
                    {
                      "binary": True,
                      "kind": "raw",
                      "media": "image/png",
                    },
                  ],
                  "binary": True,
                  "kind": "raw",
                  "media": "image/jpeg",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

# PollinationsAi SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "type": "`$ARRAY`",
          },
          {
            "name": "created",
            "short": "Unix timestamp of when the generation was created",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the generation",
            "type": "`$STRING`",
          },
          {
            "name": "max_tokens",
            "short": "Maximum number of tokens to generate",
            "type": "`$INTEGER`",
          },
          {
            "name": "messages",
            "req": True,
            "short": "Array of message objects for the conversation",
            "type": "`$ARRAY`",
          },
          {
            "name": "model",
            "short": "The model used for generation",
            "type": "`$STRING`",
          },
          {
            "name": "object",
            "type": "`$STRING`",
          },
          {
            "name": "seed",
            "short": "Seed for reproducible text generation",
            "type": "`$INTEGER`",
          },
          {
            "name": "temperature",
            "short": "Controls randomness in generation (0.0 to 2.0)",
            "type": "`$NUMBER`",
          },
          {
            "name": "usage",
            "type": "`$OBJECT`",
          },
        ],
        "name": "generate_text",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
                "args": {
                  "params": [
                    {
                      "example": "A beautiful sunset over mountains",
                      "kind": "param",
                      "name": "prompt",
                      "orig": "prompt",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": False,
                      "kind": "query",
                      "name": "enhance",
                      "orig": "enhance",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "example": 1024,
                      "kind": "query",
                      "name": "height",
                      "orig": "height",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "flux",
                      "kind": "query",
                      "name": "model",
                      "orig": "model",
                      "type": "`$STRING`",
                    },
                    {
                      "example": False,
                      "kind": "query",
                      "name": "nologo",
                      "orig": "nologo",
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "kind": "query",
                      "name": "seed",
                      "orig": "seed",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 1024,
                      "kind": "query",
                      "name": "width",
                      "orig": "width",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/prompt/{prompt}",
                "parts": [
                  "prompt",
                  "{prompt}",
                ],
                "select": {
                  "exist": [
                    "enhance",
                    "height",
                    "model",
                    "nologo",
                    "prompt",
                    "seed",
                    "width",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "prompt",
            ],
          ],
        },
      },
    },
    }

# PollinationsAi SDK configuration

module PollinationsAiConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "PollinationsAi",
        "slug" => "pollinations-ai",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://image.pollinations.ai",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "generate_text" => {},
          "image_generation" => {},
        },
      },
      "entity" => {
        "generate_text" => {
          "fields" => [
            {
              "name" => "choices",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "created",
              "short" => "Unix timestamp of when the generation was created",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the generation",
              "type" => "`$STRING`",
            },
            {
              "name" => "max_tokens",
              "short" => "Maximum number of tokens to generate",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "messages",
              "req" => true,
              "short" => "Array of message objects for the conversation",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "model",
              "short" => "The model used for generation",
              "type" => "`$STRING`",
            },
            {
              "name" => "object",
              "type" => "`$STRING`",
            },
            {
              "name" => "seed",
              "short" => "Seed for reproducible text generation",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "temperature",
              "short" => "Controls randomness in generation (0.0 to 2.0)",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "usage",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "generate_text",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "image_generation" => {
          "fields" => [],
          "name" => "image_generation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "A beautiful sunset over mountains",
                        "kind" => "param",
                        "name" => "prompt",
                        "orig" => "prompt",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "enhance",
                        "orig" => "enhance",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 1024,
                        "kind" => "query",
                        "name" => "height",
                        "orig" => "height",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "flux",
                        "kind" => "query",
                        "name" => "model",
                        "orig" => "model",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "nologo",
                        "orig" => "nologo",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "seed",
                        "orig" => "seed",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 1024,
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/prompt/{prompt}",
                  "segments" => [
                    {
                      "lit" => "prompt",
                    },
                    {
                      "var" => "prompt",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "enhance",
                      "height",
                      "model",
                      "nologo",
                      "prompt",
                      "seed",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "prompt",
                    "{prompt}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "prompt",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PollinationsAiFeatures.make_feature(name)
  end
end

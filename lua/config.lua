-- PollinationsAi SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PollinationsAi",
      slug = "pollinations-ai",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://image.pollinations.ai",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["generate_text"] = {},
        ["image_generation"] = {},
      },
    },
    entity = {
      ["generate_text"] = {
        ["fields"] = {
          {
            ["name"] = "choices",
            ["title"] = "Choices",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "created",
            ["title"] = "Created",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unix timestamp of when the generation was created",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier for the generation",
          },
          {
            ["name"] = "max_tokens",
            ["title"] = "Max Tokens",
            ["type"] = "`$INTEGER`",
            ["short"] = "Maximum number of tokens to generate",
          },
          {
            ["name"] = "messages",
            ["title"] = "Messages",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "Array of message objects for the conversation",
          },
          {
            ["name"] = "model",
            ["title"] = "Model",
            ["type"] = "`$STRING`",
            ["short"] = "The model used for generation",
          },
          {
            ["name"] = "object",
            ["title"] = "Object",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "seed",
            ["title"] = "Seed",
            ["type"] = "`$INTEGER`",
            ["short"] = "Seed for reproducible text generation",
          },
          {
            ["name"] = "temperature",
            ["title"] = "Temperature",
            ["type"] = "`$NUMBER`",
            ["short"] = "Controls randomness in generation (0.0 to 2.0)",
          },
          {
            ["name"] = "usage",
            ["title"] = "Usage",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "generate_text",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/",
                ["segments"] = {},
                ["parts"] = {},
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["image_generation"] = {
        ["fields"] = {},
        ["name"] = "image_generation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/prompt/{prompt}",
                ["segments"] = {
                  {
                    ["lit"] = "prompt",
                  },
                  {
                    ["var"] = "prompt",
                  },
                },
                ["parts"] = {
                  "prompt",
                  "{prompt}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "prompt",
                      ["orig"] = "prompt",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "A beautiful sunset over mountains",
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "enhance",
                      ["orig"] = "enhance",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "height",
                      ["orig"] = "height",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1024,
                    },
                    {
                      ["name"] = "model",
                      ["orig"] = "model",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "flux",
                    },
                    {
                      ["name"] = "nologo",
                      ["orig"] = "nologo",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                      ["example"] = false,
                    },
                    {
                      ["name"] = "seed",
                      ["orig"] = "seed",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1024,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "enhance",
                    "height",
                    "model",
                    "nologo",
                    "prompt",
                    "seed",
                    "width",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config

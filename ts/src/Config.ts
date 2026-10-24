
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'PollinationsAi',
        slug: "pollinations-ai",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://image.pollinations.ai",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        generate_text: {
        },
  
        image_generation: {
        },
  
    }
  }


  entity = {
    "generate_text": {
      "fields": [
        {
          "name": "choices",
          "title": "Choices",
          "type": "`$ARRAY`"
        },
        {
          "name": "created",
          "title": "Created",
          "type": "`$INTEGER`",
          "short": "Unix timestamp of when the generation was created"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "short": "Unique identifier for the generation"
        },
        {
          "name": "max_tokens",
          "title": "Max Tokens",
          "type": "`$INTEGER`",
          "short": "Maximum number of tokens to generate"
        },
        {
          "name": "messages",
          "title": "Messages",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Array of message objects for the conversation"
        },
        {
          "name": "model",
          "title": "Model",
          "type": "`$STRING`",
          "short": "The model used for generation"
        },
        {
          "name": "object",
          "title": "Object",
          "type": "`$STRING`"
        },
        {
          "name": "seed",
          "title": "Seed",
          "type": "`$INTEGER`",
          "short": "Seed for reproducible text generation"
        },
        {
          "name": "temperature",
          "title": "Temperature",
          "type": "`$NUMBER`",
          "short": "Controls randomness in generation (0.0 to 2.0)"
        },
        {
          "name": "usage",
          "title": "Usage",
          "type": "`$OBJECT`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "prompt"
                },
                {
                  "var": "prompt"
                }
              ],
              "parts": [
                "prompt",
                "{prompt}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "prompt",
                    "orig": "prompt",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "A beautiful sunset over mountains"
                  }
                ],
                "query": [
                  {
                    "name": "enhance",
                    "orig": "enhance",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  },
                  {
                    "name": "height",
                    "orig": "height",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1024
                  },
                  {
                    "name": "model",
                    "orig": "model",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "flux"
                  },
                  {
                    "name": "nologo",
                    "orig": "nologo",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  },
                  {
                    "name": "seed",
                    "orig": "seed",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  },
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1024
                  }
                ]
              },
              "select": {
                "exist": [
                  "prompt"
                ]
              },
              "response": {
                "alternatives": [
                  {
                    "binary": true,
                    "kind": "raw",
                    "media": "image/png"
                  }
                ],
                "binary": true,
                "kind": "raw",
                "media": "image/jpeg"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


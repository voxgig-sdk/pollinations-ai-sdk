
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
          "type": "`$ARRAY`"
        },
        {
          "name": "created",
          "short": "Unix timestamp of when the generation was created",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the generation",
          "type": "`$STRING`"
        },
        {
          "name": "max_tokens",
          "short": "Maximum number of tokens to generate",
          "type": "`$INTEGER`"
        },
        {
          "name": "messages",
          "req": true,
          "short": "Array of message objects for the conversation",
          "type": "`$ARRAY`"
        },
        {
          "name": "model",
          "short": "The model used for generation",
          "type": "`$STRING`"
        },
        {
          "name": "object",
          "type": "`$STRING`"
        },
        {
          "name": "seed",
          "short": "Seed for reproducible text generation",
          "type": "`$INTEGER`"
        },
        {
          "name": "temperature",
          "short": "Controls randomness in generation (0.0 to 2.0)",
          "type": "`$NUMBER`"
        },
        {
          "name": "usage",
          "type": "`$OBJECT`"
        }
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
                "res": "`body`"
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
              "args": {
                "params": [
                  {
                    "example": "A beautiful sunset over mountains",
                    "kind": "param",
                    "name": "prompt",
                    "orig": "prompt",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": false,
                    "kind": "query",
                    "name": "enhance",
                    "orig": "enhance",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "example": 1024,
                    "kind": "query",
                    "name": "height",
                    "orig": "height",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "flux",
                    "kind": "query",
                    "name": "model",
                    "orig": "model",
                    "type": "`$STRING`"
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "nologo",
                    "orig": "nologo",
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "kind": "query",
                    "name": "seed",
                    "orig": "seed",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 1024,
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/prompt/{prompt}",
              "parts": [
                "prompt",
                "{prompt}"
              ],
              "select": {
                "exist": [
                  "enhance",
                  "height",
                  "model",
                  "nologo",
                  "prompt",
                  "seed",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "prompt"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}


// Typed models for the PollinationsAi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GenerateText {
  choices?: any[]
  created?: number
  id?: string
  max_tokens?: number
  messages: any[]
  model?: string
  object?: string
  seed?: number
  temperature?: number
  usage?: Record<string, any>
}

export interface GenerateTextCreateData {
  choices?: any[]
  created?: number
  id?: string
  max_tokens?: number
  messages: any[]
  model?: string
  object?: string
  seed?: number
  temperature?: number
  usage?: Record<string, any>
}

export interface ImageGeneration {
}

export interface ImageGenerationLoadMatch {
  prompt: string
}


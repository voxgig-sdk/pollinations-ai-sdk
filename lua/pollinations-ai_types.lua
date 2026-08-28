-- Typed models for the PollinationsAi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GenerateText
---@field choices? table
---@field created? number
---@field id? string
---@field max_tokens? number
---@field messages table
---@field model? string
---@field object? string
---@field seed? number
---@field temperature? number
---@field usage? table

---@class GenerateTextCreateData
---@field choices? table
---@field created? number
---@field id? string
---@field max_tokens? number
---@field messages table
---@field model? string
---@field object? string
---@field seed? number
---@field temperature? number
---@field usage? table

---@class ImageGeneration

---@class ImageGenerationLoadMatch
---@field prompt string
---@field enhance? boolean
---@field height? number
---@field model? string
---@field nologo? boolean
---@field seed? number
---@field width? number

local M = {}

return M

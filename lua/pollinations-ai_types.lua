-- Typed models for the PollinationsAi SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GenerateText
---@field choice? table
---@field created? number
---@field id? string
---@field max_token? number
---@field message table
---@field model? string
---@field object? string
---@field seed? number
---@field temperature? number
---@field usage? table

---@class GenerateTextCreateData
---@field choice? table
---@field created? number
---@field id? string
---@field max_token? number
---@field message table
---@field model? string
---@field object? string
---@field seed? number
---@field temperature? number
---@field usage? table

---@class ImageGeneration

---@class ImageGenerationLoadMatch
---@field prompt string

local M = {}

return M

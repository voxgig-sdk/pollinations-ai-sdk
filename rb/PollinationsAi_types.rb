# frozen_string_literal: true

# Typed models for the PollinationsAi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GenerateText entity data model.
#
# @!attribute [rw] choices
#   @return [Array, nil]
#
# @!attribute [rw] created
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] max_tokens
#   @return [Integer, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] seed
#   @return [Integer, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] usage
#   @return [Hash, nil]
GenerateText = Struct.new(
  :choices,
  :created,
  :id,
  :max_tokens,
  :messages,
  :model,
  :object,
  :seed,
  :temperature,
  :usage,
  keyword_init: true
)

# Request payload for GenerateText#create.
#
# @!attribute [rw] choices
#   @return [Array, nil]
#
# @!attribute [rw] created
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] max_tokens
#   @return [Integer, nil]
#
# @!attribute [rw] messages
#   @return [Array]
#
# @!attribute [rw] model
#   @return [String, nil]
#
# @!attribute [rw] object
#   @return [String, nil]
#
# @!attribute [rw] seed
#   @return [Integer, nil]
#
# @!attribute [rw] temperature
#   @return [Float, nil]
#
# @!attribute [rw] usage
#   @return [Hash, nil]
GenerateTextCreateData = Struct.new(
  :choices,
  :created,
  :id,
  :max_tokens,
  :messages,
  :model,
  :object,
  :seed,
  :temperature,
  :usage,
  keyword_init: true
)

# ImageGeneration entity data model.
class ImageGeneration
end

# Request payload for ImageGeneration#load.
#
# @!attribute [rw] prompt
#   @return [String]
ImageGenerationLoadMatch = Struct.new(
  :prompt,
  keyword_init: true
)


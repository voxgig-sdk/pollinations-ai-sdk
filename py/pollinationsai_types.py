# Typed models for the PollinationsAi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GenerateTextRequired(TypedDict):
    message: list


class GenerateText(GenerateTextRequired, total=False):
    choice: list
    created: int
    id: str
    max_token: int
    model: str
    object: str
    seed: int
    temperature: float
    usage: dict


class GenerateTextCreateDataRequired(TypedDict):
    message: list


class GenerateTextCreateData(GenerateTextCreateDataRequired, total=False):
    choice: list
    created: int
    id: str
    max_token: int
    model: str
    object: str
    seed: int
    temperature: float
    usage: dict


class ImageGeneration(TypedDict):
    pass


class ImageGenerationLoadMatch(TypedDict):
    prompt: str

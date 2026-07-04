# Typed models for the PollinationsAi SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GenerateText:
    message: list
    choice: Optional[list] = None
    created: Optional[int] = None
    id: Optional[str] = None
    max_token: Optional[int] = None
    model: Optional[str] = None
    object: Optional[str] = None
    seed: Optional[int] = None
    temperature: Optional[float] = None
    usage: Optional[dict] = None


@dataclass
class GenerateTextCreateData:
    choice: Optional[list] = None
    created: Optional[int] = None
    id: Optional[str] = None
    max_token: Optional[int] = None
    message: Optional[list] = None
    model: Optional[str] = None
    object: Optional[str] = None
    seed: Optional[int] = None
    temperature: Optional[float] = None
    usage: Optional[dict] = None


@dataclass
class ImageGeneration:
    pass


@dataclass
class ImageGenerationLoadMatch:
    prompt: str


<?php
declare(strict_types=1);

// Typed models for the PollinationsAi SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GenerateText entity data model. */
class GenerateText
{
    public ?array $choices = null;
    public ?int $created = null;
    public ?string $id = null;
    public ?int $max_tokens = null;
    public array $messages;
    public ?string $model = null;
    public ?string $object = null;
    public ?int $seed = null;
    public ?float $temperature = null;
    public ?array $usage = null;
}

/** Request payload for GenerateText#create. */
class GenerateTextCreateData
{
    public ?array $choices = null;
    public ?int $created = null;
    public ?string $id = null;
    public ?int $max_tokens = null;
    public array $messages;
    public ?string $model = null;
    public ?string $object = null;
    public ?int $seed = null;
    public ?float $temperature = null;
    public ?array $usage = null;
}

/** ImageGeneration entity data model. */
class ImageGeneration
{
}

/** Request payload for ImageGeneration#load. */
class ImageGenerationLoadMatch
{
    public string $prompt;
    public ?bool $enhance = null;
    public ?int $height = null;
    public ?string $model = null;
    public ?bool $nologo = null;
    public ?int $seed = null;
    public ?int $width = null;
}


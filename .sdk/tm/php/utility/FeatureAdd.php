<?php
declare(strict_types=1);

// PollinationsAi SDK utility: feature_add

class PollinationsAiFeatureAdd
{
    public static function call(PollinationsAiContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

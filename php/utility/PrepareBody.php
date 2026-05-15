<?php
declare(strict_types=1);

// PollinationsAi SDK utility: prepare_body

class PollinationsAiPrepareBody
{
    public static function call(PollinationsAiContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

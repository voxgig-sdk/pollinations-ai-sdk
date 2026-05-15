<?php
declare(strict_types=1);

// PollinationsAi SDK utility: result_body

class PollinationsAiResultBody
{
    public static function call(PollinationsAiContext $ctx): ?PollinationsAiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

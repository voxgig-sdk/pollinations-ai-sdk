<?php
declare(strict_types=1);

// PollinationsAi SDK utility: result_headers

class PollinationsAiResultHeaders
{
    public static function call(PollinationsAiContext $ctx): ?PollinationsAiResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

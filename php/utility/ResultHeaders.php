<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility: result_headers

class NidApplicationSystemResultHeaders
{
    public static function call(NidApplicationSystemContext $ctx): ?NidApplicationSystemResult
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

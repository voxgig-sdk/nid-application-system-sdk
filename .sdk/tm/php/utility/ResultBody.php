<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility: result_body

class NidApplicationSystemResultBody
{
    public static function call(NidApplicationSystemContext $ctx): ?NidApplicationSystemResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

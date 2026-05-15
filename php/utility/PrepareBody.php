<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility: prepare_body

class NidApplicationSystemPrepareBody
{
    public static function call(NidApplicationSystemContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

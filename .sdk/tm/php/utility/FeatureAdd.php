<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility: feature_add

class NidApplicationSystemFeatureAdd
{
    public static function call(NidApplicationSystemContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

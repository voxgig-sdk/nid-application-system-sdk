<?php
declare(strict_types=1);

// NidApplicationSystem SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NidApplicationSystemMakeContext
{
    public static function call(array $ctxmap, ?NidApplicationSystemContext $basectx): NidApplicationSystemContext
    {
        return new NidApplicationSystemContext($ctxmap, $basectx);
    }
}

<?php
declare(strict_types=1);

// NidApplicationSystem SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NidApplicationSystemFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NidApplicationSystemBaseFeature();
            case "test":
                return new NidApplicationSystemTestFeature();
            default:
                return new NidApplicationSystemBaseFeature();
        }
    }
}

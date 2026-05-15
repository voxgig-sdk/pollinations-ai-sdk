<?php
declare(strict_types=1);

// PollinationsAi SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PollinationsAiFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PollinationsAiBaseFeature();
            case "test":
                return new PollinationsAiTestFeature();
            default:
                return new PollinationsAiBaseFeature();
        }
    }
}

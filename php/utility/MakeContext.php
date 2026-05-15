<?php
declare(strict_types=1);

// PollinationsAi SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PollinationsAiMakeContext
{
    public static function call(array $ctxmap, ?PollinationsAiContext $basectx): PollinationsAiContext
    {
        return new PollinationsAiContext($ctxmap, $basectx);
    }
}

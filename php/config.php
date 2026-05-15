<?php
declare(strict_types=1);

// PollinationsAi SDK configuration

class PollinationsAiConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PollinationsAi",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://image.pollinations.ai",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "generate_text" => [],
                    "image_generation" => [],
                ],
            ],
            "entity" => [
        'generate_text' => [
          'fields' => [
            [
              'name' => 'choice',
              'req' => false,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'created',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'max_token',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'message',
              'req' => true,
              'type' => '`$ARRAY`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'model',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'object',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'seed',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'temperature',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 8,
            ],
            [
              'name' => 'usage',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 9,
            ],
          ],
          'name' => 'generate_text',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'method' => 'POST',
                  'orig' => '/',
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'parts' => [],
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'image_generation' => [
          'fields' => [],
          'name' => 'image_generation',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'A beautiful sunset over mountains',
                        'kind' => 'param',
                        'name' => 'prompt',
                        'orig' => 'prompt',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'enhance',
                        'orig' => 'enhance',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                        'active' => true,
                      ],
                      [
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'height',
                        'orig' => 'height',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 'flux',
                        'kind' => 'query',
                        'name' => 'model',
                        'orig' => 'model',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'nologo',
                        'orig' => 'nologo',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                        'active' => true,
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'seed',
                        'orig' => 'seed',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                      [
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'width',
                        'orig' => 'width',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/prompt/{prompt}',
                  'parts' => [
                    'prompt',
                    '{prompt}',
                  ],
                  'select' => [
                    'exist' => [
                      'enhance',
                      'height',
                      'model',
                      'nologo',
                      'prompt',
                      'seed',
                      'width',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'prompt',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return PollinationsAiFeatures::make_feature($name);
    }
}

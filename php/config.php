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
              'active' => true,
              'name' => 'choice',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'created',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'id',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'max_token',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'message',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'model',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'object',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'seed',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'temperature',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'usage',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 9,
            ],
          ],
          'name' => 'generate_text',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'method' => 'POST',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
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
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 'A beautiful sunset over mountains',
                        'kind' => 'param',
                        'name' => 'prompt',
                        'orig' => 'prompt',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'enhance',
                        'orig' => 'enhance',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'height',
                        'orig' => 'height',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 'flux',
                        'kind' => 'query',
                        'name' => 'model',
                        'orig' => 'model',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'nologo',
                        'orig' => 'nologo',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'seed',
                        'orig' => 'seed',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'width',
                        'orig' => 'width',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
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
                  'index$' => 0,
                ],
              ],
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

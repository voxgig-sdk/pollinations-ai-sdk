<?php
declare(strict_types=1);

// PollinationsAi SDK configuration

class PollinationsAiConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "PollinationsAi",
                "slug" => "pollinations-ai",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://image.pollinations.ai",
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
              'name' => 'choices',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'created',
              'short' => 'Unix timestamp of when the generation was created',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the generation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'max_tokens',
              'short' => 'Maximum number of tokens to generate',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'messages',
              'req' => true,
              'short' => 'Array of message objects for the conversation',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'model',
              'short' => 'The model used for generation',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'object',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'seed',
              'short' => 'Seed for reproducible text generation',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'temperature',
              'short' => 'Controls randomness in generation (0.0 to 2.0)',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'usage',
              'type' => '`$OBJECT`',
            ],
          ],
          'name' => 'generate_text',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
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
                  'args' => [
                    'params' => [
                      [
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
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'enhance',
                        'orig' => 'enhance',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'height',
                        'orig' => 'height',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'flux',
                        'kind' => 'query',
                        'name' => 'model',
                        'orig' => 'model',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'nologo',
                        'orig' => 'nologo',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'seed',
                        'orig' => 'seed',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 1024,
                        'kind' => 'query',
                        'name' => 'width',
                        'orig' => 'width',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
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

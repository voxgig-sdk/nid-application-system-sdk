<?php
declare(strict_types=1);

// NidApplicationSystem SDK configuration

class NidApplicationSystemConfig
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
                "name" => "NidApplicationSystem",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://services.nidw.gov.bd/nid-pub",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "application" => [],
                    "application_status" => [],
                    "login" => [],
                    "nid_management" => [],
                    "registration" => [],
                    "success" => [],
                ],
            ],
            "entity" => [
        'application' => [
          'fields' => [
            [
              'name' => 'additionalInfo',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nidNumber',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'policeReportNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reason',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'application',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/application/correction',
                  'parts' => [
                    'application',
                    'correction',
                  ],
                  'select' => [
                    '$action' => 'correction',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/application/duplicate',
                  'parts' => [
                    'application',
                    'duplicate',
                  ],
                  'select' => [
                    '$action' => 'duplicate',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/application/new-registration',
                  'parts' => [
                    'application',
                    'new-registration',
                  ],
                  'select' => [
                    '$action' => 'new_registration',
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
            'ancestors' => [],
          ],
        ],
        'application_status' => [
          'fields' => [
            [
              'name' => 'applicationId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'applicationType',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lastUpdated',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nidNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'remarks',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'submissionDate',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'application_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'application_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/application/status/{applicationId}',
                  'parts' => [
                    'application',
                    'status',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'applicationId' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
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
            'ancestors' => [],
          ],
        ],
        'login' => [
          'fields' => [
            [
              'name' => 'accountStatus',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'captcha',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'fullName',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nidNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'password',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'userId',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'username',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'login',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/login',
                  'parts' => [
                    'auth',
                    'login',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'nid_management' => [
          'fields' => [],
          'name' => 'nid_management',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'pdf',
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'nid_number',
                        'orig' => 'nid_number',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/nid/download',
                  'parts' => [
                    'nid',
                    'download',
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'nid_number',
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
            'ancestors' => [],
          ],
        ],
        'registration' => [
          'fields' => [
            [
              'name' => 'confirmPassword',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'dateOfBirth',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nidNumber',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'password',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'phone',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'registration',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/register',
                  'parts' => [
                    'auth',
                    'register',
                  ],
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
        'success' => [
          'fields' => [
            [
              'name' => 'code',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isOverseas',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'message',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nidNumber',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'success',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'success',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/auth/password-reset',
                  'parts' => [
                    'auth',
                    'password-reset',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/verification/send-code',
                  'parts' => [
                    'verification',
                    'send-code',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/verification/verify-code',
                  'parts' => [
                    'verification',
                    'verify-code',
                  ],
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
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NidApplicationSystemFeatures::make_feature($name);
    }
}

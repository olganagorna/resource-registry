<?php
return [
    'show' => [
        'type' => 2,
    ],
    'addcomm' => [
        'type' => 2,
    ],
    'view' => [
        'type' => 2,
    ],
    'guest' => [
        'type' => 1,
        'ruleName' => 'userGroup',
    ],
    'user' => [
        'type' => 1,
        'ruleName' => 'userGroup',
    ],
    'registrar' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'show',
            'view',
        ],
    ],
    'commissioner' => [
        'type' => 1,
        'ruleName' => 'userGroup',
    ],
    'admin' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'addcomm',
        ],
    ],
];

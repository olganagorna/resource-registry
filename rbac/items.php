<?php
return [
    'user/logout' => [
        'type' => 2,
    ],
    'community/show' => [
        'type' => 2,
    ],
    'community/addcomm' => [
        'type' => 2,
    ],
    'resource/view' => [
        'type' => 2,
    ],
    'resource/index' => [
        'type' => 2,
    ],
    'resource/getregisterkey' => [
        'type' => 2,
    ],
    'resource/search' => [
        'type' => 2,
    ],
    'user' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'user/logout',
        ],
    ],
    'registrar' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'user/logout',
            'community/show',
            'resource/view',
            'resource/index',
            'resource/getregisterkey',
            'resource/search',
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
            'user/logout',
            'community/addcomm',
        ],
    ],
];

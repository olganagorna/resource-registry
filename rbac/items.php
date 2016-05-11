<?php
return [
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
    'resource/create' => [
        'type' => 2,
    ],
    'user/userdata' => [
        'type' => 2,
    ],
    'user' => [
        'type' => 1,
        'ruleName' => 'userGroup',
    ],
    'registrar' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'community/show',
            'resource/view',
            'resource/index',
            'resource/getregisterkey',
            'resource/search',
            'user/userdata',
            'resource/create',
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
            'community/addcomm',
        ],
    ],
];

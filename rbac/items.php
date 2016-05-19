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
    'resource/gettingdata' => [
        'type' => 2,
    ],
    'resource/additiondata' => [
        'type' => 2,
    ],
    'resource_class/index' => [
        'type' => 2,
    ],
    'resource_class/search' => [
        'type' => 2,
    ],
    'resource_class/changeactivationstatus' => [
        'type' => 2,
    ],
    'user/userdata' => [
        'type' => 2,
    ],
    'user/getrole' => [
        'type' => 2,
    ],
    'user/changeactivationstatus' => [
        'type' => 2,
    ],
    'user/changerole' => [
        'type' => 2,
    ],
    'request/showrequest' => [
        'type' => 2,
    ],
    'request/addreq' => [
        'type' => 2,
    ],
    'search/search' => [
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
            'user/getrole',
            'user/changeactivationstatus',
            'user/changerole',
            'request/showrequest',
            'request/addreq',
            'resource/gettingdata',
            'resource/additiondata',
            'resource_class/search',
            'resource_class/changeactivationstatus',
            'resource_class/index',
            'search/search',
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
            'resource_class/search',
            'resource_class/changeactivationstatus',
            'resource_class/index',
        ],
    ],
];

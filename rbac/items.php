<?php
return [
    'community/show' => [
        'type' => 2,
    ],
    'community/addcomm' => [
        'type' => 2,
    ],
    'community/view' => [
        'type' => 2,
    ],
    'community/update' => [
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
    'attribute_class_view/index' => [
        'type' => 2,
    ],
    'resource_class/attribute' => [
        'type' => 2,
    ],
    'attribute_class_view/attribute' => [
        'type' => 2,
    ],
    'attribute_class_view/addattribute' => [
        'type' => 2,
    ],
    'attribute_class_view/findlastattributeid' => [
        'type' => 2,
    ],
    'user' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'resource/view',
            'resource/index',
            'resource/search',
            'resource_class/index',
            'resource/getregisterkey',
            'resource/create',
            'resource/gettingdata',
            'resource/additiondata',
        ],
    ],
    'registrar' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'user',
            'request/showrequest',
            'request/addreq',
            'search/search',
        ],
    ],
    'commissioner' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'user',
        ],
    ],
    'admin' => [
        'type' => 1,
        'ruleName' => 'userGroup',
        'children' => [
            'user/userdata',
            'user/getrole',
            'user/changeactivationstatus',
            'user/changerole',
            'community/addcomm',
            'community/show',
            'community/view',
            'community/update',
            'resource_class/search',
            'resource_class/changeactivationstatus',
            'resource_class/index',
            'attribute_class_view/index',
            'resource_class/attribute',
            'attribute_class_view/attribute',
            'attribute_class_view/addattribute',
            'attribute_class_view/findlastattributeid',
        ],
    ],
];

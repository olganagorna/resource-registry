<?php
namespace app\rbac;
 
use Yii;
use yii\rbac\Rule;
 
class UserGroupRule extends Rule
{
    public $name = 'userGroup';
 
    public function execute($user, $item, $params)
    {
        if (!\Yii::$app->user->isGuest) {
            $group = \Yii::$app->user->identity->role_id;
            if ($item->name === 'admin') {
                return $group == 3;
            } elseif ($item->name === 'user') {
                return $group == 1 || $group == 2 || $group == 4;
            } elseif ($item->name === 'registrar') {
                return $group == 2;
            } elseif ($item->name === 'commissioner') {
                return $group == 4;
            }
        }
        return false;
    }
}

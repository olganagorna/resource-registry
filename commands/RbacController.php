<?php
namespace app\commands;
 
use Yii;
use yii\console\Controller;
use \app\rbac\UserGroupRule;

//run php yii rbac/init in project dir
 
class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = \Yii::$app->authManager;
        $auth->removeAll();
        // Create roles
        $guest =        $auth->createRole('guest');
        $user =         $auth->createRole('user');
        $registrar =    $auth->createRole('registrar');
        $commissioner = $auth->createRole('commissioner');
        $admin =        $auth->createRole('admin');
 
        // Create simple, based on action{$NAME} permissions
        /*$login  =   $auth->createPermission('login');
        $logout =   $auth->createPermission('logout');*/
        $show = $auth->createPermission('show');
        $addcomm = $auth->createPermission('addcomm');
        $view = $auth->createPermission('view');
         
        // Add permissions in Yii::$app->authManager
        /*$auth->add($login);
        $auth->add($logout);*/
        $auth->add($show);
        $auth->add($addcomm);
        $auth->add($view);
          
        // Add rule, based on UserExt->group === $user->group
        $userGroupRule = new UserGroupRule();
        $auth->add($userGroupRule);
 
        // Add rule "UserGroupRule" in roles
        $guest->ruleName  = $userGroupRule->name;
        $user->ruleName  = $userGroupRule->name;
        $registrar->ruleName = $userGroupRule->name;
        $commissioner->ruleName = $userGroupRule->name;
        $admin->ruleName  = $userGroupRule->name;
 
        // Add roles in Yii::$app->authManager
        $auth->add($guest);
        $auth->add($user);
        $auth->add($registrar);
        $auth->add($commissioner);
        $auth->add($admin);
 
        // Add permission-per-role in Yii::$app->authManager
        // guest
        /*$auth->addChild($guest, $login);
        $auth->addChild($guest, $logout);
         
        // user
        $auth->addChild($user, $guest);*/
 
        // registrar
        $auth->addChild($registrar, $show);
        $auth->addChild($registrar, $view);

        /*// commissioner
        $auth->addChild($commissioner, $userdata);
        $auth->addChild($commissioner, $user);
 */
        // admin
        $auth->addChild($admin, $addcomm);
    }
}

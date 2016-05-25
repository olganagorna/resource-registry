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
        $user =         $auth->createRole('user');
        $registrar =    $auth->createRole('registrar');
        $commissioner = $auth->createRole('commissioner');
        $admin =        $auth->createRole('admin');
 
        // Create simple, based on controller and action{$NAME} permissions
        // Add permissions in Yii::$app->authManager

        $commShow = $auth->createPermission('community/show'); 
        $auth->add($commShow); 
        $commAdd = $auth->createPermission('community/addcomm'); 
        $auth->add($commAdd);
        $commView = $auth->createPermission('community/view'); 
        $auth->add($commView);
        $commUpdt = $auth->createPermission('community/update'); 
        $auth->add($commUpdt); 
        $view = $auth->createPermission('resource/view'); 
        $auth->add($view); 
        $resIndex = $auth->createPermission('resource/index'); 
        $auth->add($resIndex); 
        $getRgKey = $auth->createPermission('resource/getregisterkey'); 
        $auth->add($getRgKey); 
        $resSearch = $auth->createPermission('resource/search'); 
        $auth->add($resSearch);
        $resCreate = $auth->createPermission('resource/create');
        $auth->add($resCreate);
        $resGettingdata = $auth->createPermission('resource/gettingdata'); 
        $auth->add($resGettingdata);
        $resAdditiondata = $auth->createPermission('resource/additiondata');
        $auth->add($resAdditiondata); 
        $resourceClass = $auth->createPermission('resource_class/index'); 
        $auth->add($resourceClass);
        $resourceClassSearch = $auth->createPermission('resource_class/search'); 
        $auth->add($resourceClassSearch);
        $resourceClassChangeActivationStatus = $auth->createPermission('resource_class/changeactivationstatus');
        $auth->add($resourceClassChangeActivationStatus);
        $userdata = $auth->createPermission('user/userdata'); 
        $auth->add($userdata);
        $userGetRole = $auth->createPermission('user/getrole'); 
        $auth->add($userGetRole);
        $userChngActSt = $auth->createPermission('user/changeactivationstatus'); 
        $auth->add($userChngActSt);
        $userChngRole = $auth->createPermission('user/changerole'); 
        $auth->add($userChngRole);
        $reqShow = $auth->createPermission('request/showrequest'); 
        $auth->add($reqShow);
        $reqAdd = $auth->createPermission('request/addreq'); 
        $auth->add($reqAdd);
        $search = $auth->createPermission('search/search'); 
        $auth->add($search);

        // Add rule, based on UserExt->group === $user->group
        $userGroupRule = new UserGroupRule();
        $auth->add($userGroupRule);
 
        // Add rule "UserGroupRule" in roles
        $user->ruleName  = $userGroupRule->name;
        $registrar->ruleName = $userGroupRule->name;
        $commissioner->ruleName = $userGroupRule->name;
        $admin->ruleName  = $userGroupRule->name;
 
        // Add roles in Yii::$app->authManager
        $auth->add($user);
        $auth->add($registrar);
        $auth->add($commissioner);
        $auth->add($admin);
 
        // Add permission-per-role in Yii::$app->authManager
        // user
        $auth->addChild($user, $view);
        $auth->addChild($user, $resIndex);
        $auth->addChild($user, $resSearch);
        $auth->addChild($user, $resourceClass);
        $auth->addChild($user, $getRgKey);
        $auth->addChild($user, $resCreate);
        $auth->addChild($user, $resGettingdata);
        $auth->addChild($user, $resAdditiondata);
 
        // registrar
        $auth->addChild($registrar, $user);
        $auth->addChild($registrar, $reqShow);
        $auth->addChild($registrar, $reqAdd);
        $auth->addChild($registrar, $search);
       
        // commissioner
        $auth->addChild($commissioner, $user);
 
        // admin
        $auth->addChild($admin, $userdata);
        $auth->addChild($admin, $userGetRole);
        $auth->addChild($admin, $userChngActSt);
        $auth->addChild($admin, $userChngRole);
        $auth->addChild($admin, $commAdd);
        $auth->addChild($admin, $commShow);
        $auth->addChild($admin, $commView);
        $auth->addChild($admin, $commUpdt);        
        $auth->addChild($admin, $resourceClassSearch);
        $auth->addChild($admin, $resourceClassChangeActivationStatus);
        $auth->addChild($admin, $resourceClass);
    }
}

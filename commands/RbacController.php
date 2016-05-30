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
        $commIndex = $auth->createPermission('community/index'); 
        $auth->add($commIndex);
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
        $addResClass = $auth->createPermission('resource_class/addresourceclass'); 
        $auth->add($addResClass);
        $auth->add($resourceClassChangeActivationStatus);
        $userdata = $auth->createPermission('user/userdata'); 
        $auth->add($userdata);
        $userGetRole = $auth->createPermission('user/getrole'); 
        $auth->add($userGetRole);
        $userChngActSt = $auth->createPermission('user/changeactivationstatus'); 
        $auth->add($userChngActSt);
        $userChngRole = $auth->createPermission('user/changerole'); 
        $auth->add($userChngRole);
        $userChngCommunity = $auth->createPermission('user/changecommunity'); 
        $auth->add($userChngCommunity);
        $reqShow = $auth->createPermission('request/showrequest'); 
        $auth->add($reqShow);
        $reqAdd = $auth->createPermission('request/addreq'); 
        $auth->add($reqAdd);
        $search = $auth->createPermission('search/search'); 
        $auth->add($search);
        $resClassAttr = $auth->createPermission('attribute_class_view/index'); 
        $auth->add($resClassAttr);
        $resAttr = $auth->createPermission('resource_class/attribute'); 
        $auth->add($resAttr);
        $resAttr2 = $auth->createPermission('attribute_class_view/attribute'); 
        $auth->add($resAttr2);
        $addAttr = $auth->createPermission('attribute_class_view/addattribute'); 
        $auth->add($addAttr);
        $findAttrId = $auth->createPermission('attribute_class_view/findlastattributeid'); 
        $auth->add($findAttrId);
        $deleteAttrId = $auth->createPermission('attribute_class_view/deleteattribute'); 
        $auth->add($deleteAttrId);
        $findFilteredAttr = $auth->createPermission('attribute_class_view/findfilteredattributes'); 
        $auth->add($findFilteredAttr);
        $findFilteredAttrbyResourceClass = $auth->createPermission('attribute_class_view/findfilteredattributesforeachresourceclass'); 
        $auth->add($findFilteredAttrbyResourceClass);
        $findGlobalAttr = $auth->createPermission('resource_attribute/findglobalattributes'); 
        $auth->add($findGlobalAttr);
        $addResClass = $auth->createPermission('resource_class/addresourceclass'); 
        $auth->add($addResClass);
        
        
        


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
        $auth->addChild($user, $reqShow);
        $auth->addChild($user, $reqAdd);
         
        // registrar
        $auth->addChild($registrar, $user);
        $auth->addChild($registrar, $search);
        $auth->addChild($registrar, $findGlobalAttr);
        $auth->addChild($registrar, $findFilteredAttr);
        $auth->addChild($registrar, $findFilteredAttrbyResourceClass);
       
        // commissioner
        $auth->addChild($commissioner, $user);
        $auth->addChild($commissioner, $userdata);
        $auth->addChild($commissioner, $userGetRole);
        $auth->addChild($commissioner, $userChngActSt);
        $auth->addChild($commissioner, $userChngRole);
        $auth->addChild($commissioner, $commIndex);

        // admin
        $auth->addChild($admin, $userdata);
        $auth->addChild($admin, $userGetRole);
        $auth->addChild($admin, $userChngActSt);
        $auth->addChild($admin, $userChngRole);
        $auth->addChild($admin, $userChngCommunity);
        $auth->addChild($admin, $commAdd);
        $auth->addChild($admin, $commShow);
        $auth->addChild($admin, $commView);
        $auth->addChild($admin, $commUpdt);
        $auth->addChild($admin, $commIndex);
        $auth->addChild($admin, $addResClass);        
        $auth->addChild($admin, $resourceClassSearch);
        $auth->addChild($admin, $resourceClassChangeActivationStatus);
        $auth->addChild($admin, $resourceClass);
        $auth->addChild($admin, $resClassAttr);
        $auth->addChild($admin, $resAttr);
        $auth->addChild($admin, $resAttr2);
        $auth->addChild($admin, $addAttr);
        $auth->addChild($admin, $findAttrId);
        $auth->addChild($admin, $deleteAttrId);        
        $auth->addChild($admin, $findGlobalAttr);
        $auth->addChild($admin, $findFilteredAttr);
        $auth->addChild($admin, $findFilteredAttrbyResourceClass);
        
        
        
        
    }
}

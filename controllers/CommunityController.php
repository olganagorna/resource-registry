<?php
namespace app\controllers;

//use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\User;
use app\models\Community;

class CommunityController extends AppController
{
	public $modelClass = 'app\models\Community';

        public function beforeAction($action)
    {
        if (parent::beforeAction($action)) {
            if (!\Yii::$app->user->can($action->id)) {
                throw new \yii\web\ForbiddenHttpException('Access denied');
                $module =Yii::$app->controller->module->id;
                        /*$action =Yii::$app->controller->action->id;
                        $controller=Yii::$app->controller->id;
                        $route="$controller/$action";
                        $post =Yii::$app->request->post();
                        if(\Yii::$app->user->can($route)){
                                return true;
*/
            }
            return true;
        } else {
            return false;
        }
    }
	
	public function actionShow()
	{
		$request= \Yii::$app->request->get();
		$community = Community::find();
		
		if(isset($request['value'])){
			$community->select(['name', 'prefix', 'notes'])
			->andFilterWhere(['like', 'name', $request['value']])
            ->orderBy('name')
			->asArray();	
		}else{
			$community->select(['name', 'prefix', 'notes'])
            ->orderBy('name')
			->asArray();
		}

	    $dataProvider = new ActiveDataProvider([
			'query' => $community,
			'pagination' => [
				'pageSize' => 4,
				'pageParam' => 'page',
			],
		]);
		
		return $dataProvider;
	}

	public function actionAddcomm()
    {
        // add Community controller
        if (!$post = \Yii::$app->getRequest()->getBodyParams()) {
            throw new \yii\web\HttpException(400, 'Дані не отримані');
        }
        $communityModel = new Community();
        if ($communityModel->findByCommunityName($post['com_name'])){
            throw new \yii\web\HttpException(400, 'Користувач з таким логіном уже існує');
        }
        $com_name = $post['com_name'];
        $com_num = $post['com_num'];
        $com_adds = $post['com_adds'];

        $communityModel->name = $com_name;
        $communityModel->prefix = $com_num;
        $communityModel->notes = $com_adds;
        if (!$communityModel->save()){
            foreach($communityModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }
    }
}
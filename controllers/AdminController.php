<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\Admin;

class AdminController extends ActiveController {

	public $modelClass = 'app\models\Admin';
	//for pagination
	public $serializer = [ 'class' => 'yii\rest\Serializer', 'collectionEnvelope' => 'items']; 
	public function actionAdmin() {

		$request= \Yii::$app->request->get();

		$admin = Admin::find()
		->select(['user_id','username', 'last_name','first_name','name'])
		->innerJoinWith('personalData')->innerJoinWith('role')
		->andFilterWhere(['like', $request['field'], $request['value']])
		->orderBy($request['column'])
		->asArray();
		
		$dataProvider = new ActiveDataProvider([
			'query' => $admin,
			'pagination' => [
				'pageSize' => 4,
				'pageParam' => 'page',
			],
		]);
		return $dataProvider;
		
	}
}

?>
<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\GetPersonalData;

class AdminController extends ActiveController {

	public $modelClass = 'app\models\GetPersonalData';
	
	public function actionGet_personal_data() {

		$request= \Yii::$app->request->get();

		$admin = GetPersonalData::find()
		->select(['username', 'last_name','first_name','name'])
		->innerJoinWith('personalData')->innerJoinWith('role')
		->andFilterWhere(['like', $request['field'], $request['value']])
		->orderBy($request['column'])
		->asArray();
		
		$dataProvider = new ActiveDataProvider([
			'query' => $admin,
			'pagination' => [
				'pageSize' => 4,
				//'pageParam' => $get['page'],
			],
		]);
		return $dataProvider;
		
	}
}

?>
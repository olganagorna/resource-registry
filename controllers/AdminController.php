<?php
namespace app\controllers;

use app\controllers\AppController;
use yii\data\ActiveDataProvider;
use app\models\Admin;

class AdminController extends AppController {

	public $modelClass = 'app\models\Admin';
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
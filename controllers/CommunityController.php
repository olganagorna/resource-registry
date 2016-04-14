<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\Community;

class CommunityController extends ActiveController
{
	public $modelClass = 'app\models\Community';
	public function actionShow()
	{
		$request= \Yii::$app->request->get();
		//$community = Community::find()->all();
		$community = Community::find()
		->select(['name', 'prefix', 'username'])
		->innerJoinWith('users')
		->andFilterWhere(['like', $request['field'], $request['value']])
		->orderBy($request['column'])
		->asArray();
		//->all();
		//return $community;
		$dataProvider = new ActiveDataProvider([
			'query' => $community,
			'pagination' => [
				'pageSize' => 3,
			],
		]);
		return $dataProvider;
	}
}
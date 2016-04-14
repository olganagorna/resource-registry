<?php
namespace app\controllers;

use yii\rest\ActiveController;
use app\models\Community;

class CommunityController extends ActiveController
{
	public $modelClass = 'app\models\Community';
	public function actionShow()
	{
		$community = Community::find()->select(['name', 'prefix'])->asArray()->all();
		return $community;
	}
}
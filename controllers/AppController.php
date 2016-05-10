<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;

class AppController extends ActiveController {
	public $serializer = [ 'class' => 'yii\rest\Serializer', 'collectionEnvelope' => 'items'];

	public static function buildPagination ($query, $pagination = 20) {
		if(is_int($pagination)){
			$dataProvider = new ActiveDataProvider([
				'query' => $query,
				'pagination' => [
					'pageSize' => $pagination,
					'pageParam' => 'page'
				],
			]);
		}elseif($pagination === false){
			$dataProvider = new ActiveDataProvider([
				'query' => $query,
				'pagination' => $pagination,
			]);
		}
		return $dataProvider;
	}
}

?>
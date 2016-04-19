<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;

class AppController extends ActiveController {
	public $serializer = [ 'class' => 'yii\rest\Serializer', 'collectionEnvelope' => 'items']; 

	public $page = 1;
}

?>
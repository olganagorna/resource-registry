<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\ResourceClass;

class Resource_classController extends AppController
{
    public $modelClass = 'app\models\ResourceClass';
    
    public function behaviors()
    {
        return 
        \yii\helpers\ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
            ],
        ]);
    }
    public function actionSearch()
    {
    	$GET = \Yii::$app->request->get();
    	if (!empty($GET)) {
    		$model = new $this->modelClass;
    		foreach ($GET as $key => $value) {
    			if (!$model->hasAttribute($key)) {
    				throw new \yii\web\HttpException(404, 'Invalid attribute:' . $key);
    			}
    		}
    		try {
    			$provider = new ActiveDataProvider([
    					'query' => $model->find()->where($GET),
    					'pagination' => false
    			]);
    		} catch (Exception $ex) {
    			throw new \yii\web\HttpException(500, 'Internal server error');
    		}
    
    		if ($provider->getCount() <= 0) {
    			throw new \yii\web\HttpException(404, 'No entries found with this query string');
    		} else {
    			return $provider;
    		}
    	} else {
    		throw new \yii\web\HttpException(400, 'There are no query string');
    	}
    }
     public function actionChangeactivationstatus() 
    {
        $request= \Yii::$app->request->get();
        $resource_class = ResourceClass::findOne(['class_id' => $request['class_id']]);
        $resource_class->activation_status=$request['activation_status'];
        $resource_class->update();
    }

    public function actionAddresourcetype()
    {
        // add Resource type

        // if (!$post = \Yii::$app->getRequest()->getBodyParams()) {
        //     throw new \yii\web\HttpException(400, 'Дані не отримані');
        // }
        
        // $resourceClassModel = new ResourceClass();

        // if ($resourceClassModel->findByResourceClassName($post['res_class_name'])){
        //     throw new \yii\web\HttpException(400, 'Тип ресурсів з такою назвою уже існує');
        // }

        // $res_class_name = $post['res_class_name'];

        // $resourceClassModel->name = $res_class_name;

        // if (!$resourceClassModel->save()){
        //     foreach($resourceClassModel->errors as $key){
        //         $errorMessage .= $key[0];
        //     }
        //     throw new \yii\web\HttpException(422,$errorMessage);
        // }
    }
}
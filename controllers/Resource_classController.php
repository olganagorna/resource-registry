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

    public function actionPagination() {
        $dataProvider = new ActiveDataProvider([
            'query' => $getdata,
            'pagination' => [
                'pageSize' => 30,
                'pageParam' => 'page',
            ],
        ]);
    }

    public function actionChangeactivationstatus() 
    {
        $request= \Yii::$app->request->get();
        $resource_class = ResourceClass::findOne(['class_id' => $request['class_id']]);
        $resource_class->activation_status=$request['activation_status'];
        $resource_class->update();

    }
}
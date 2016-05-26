<?php
namespace app\controllers;

use app\controllers\AppController;
use yii\data\ActiveDataProvider;
use app\models\ResourceClass;
use app\models\AttributeClassView;
use app\models\ResourceAttribute;

class Resource_classController extends AppController
{
    public $modelClass = 'app\models\ResourceClass';
    public $attrClassView = 'app\models\AttributeClassView';
    public $resAttribute = 'app\models\ResourceAttribute';
    

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

        public function actionAttribute() 
    {
        $request = \Yii::$app->request->get();
        $getdata = ResourceClass::find();
        
        if(isset($request['value'])){
            $getdata->SELECT(['resource_class.class_id as class_ID','resource_class.name as res_name', 'resource_attribute.name as attr_name'])
            ->andFilterWhere(['like', 'resource_class.class_id', $request['value']])
            ->joinwith(['attributeClassView', 'attributeClassView.resourceAttribute'])
            ->asArray();
            return self::buildPagination($getdata,false); 
        }else{
            $getdata->select(['resource_class.class_id as class_ID','resource_class.name as res_name', 'resource_attribute.name as attr_name'])
            ->joinWith(['attributeClassView', 'attributeClassView.resourceAttribute'])
            ->asArray();
            return self::buildPagination($getdata, false); 
        }
    }
    // public function actionAttribute()
    // {
    //     $request= \Yii::$app->request->get();
    //     $attributes = [':name' => $request['name']];
    //     $sql = "SELECT name as attr_name FROM resource_attribute WHERE attribute_id IN (SELECT attribute_id FROM attribute_class_view, resource_class WHERE resource_class.class_id = attribute_class_view.class_id AND name=:name)";
    //     $data = \Yii::$app->db
    //         ->createCommand($sql)
    //         ->bindValues($attributes)
    //         ->queryAll();
    //     return $data;
    // }
}
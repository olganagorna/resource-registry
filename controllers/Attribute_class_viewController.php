<?php

namespace app\controllers;

use app\controllers\AppController;
use app\models\ResourceAttribute;
use app\models\AttributeClassView;

class Attribute_class_viewController extends AppController
{
    public $modelClass = 'app\models\AttributeClassView';
    public $resourceClass = 'app\models\ResourceClass';
    public $resourceAttribute = 'app\models\ResourceAttribute';
    
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

    public function actionAttribute() 
    {
        $request = \Yii::$app->request->get();
        $getdata = AttributeClassView::find();
        if(isset($request['value'])){
            $getdata->select(['view_id','resource_class.class_id as class_ID','attribute_class_view.attribute_id as attr_id', 'resource_attribute.name as attr_name', 'resource_class.name as class_name'])
            ->andFilterWhere(['like', 'resource_class.class_id', $request['value']])
            ->innerJoinWith('resourceAttribute')->innerJoinWith('resourceClass')
            ->asArray();
            return self::buildPagination($getdata, false); 
        }else{
            $getdata->select(['view_id','resource_class.class_id as class_ID','attribute_class_view.attribute_id as attr_id', 'resource_attribute.name as attr_name', 'resource_class.name as class_name'])
            ->innerJoinWith('resourceAttribute')->innerJoinWith('resourceClass')
            ->asArray();
            return self::buildPagination($getdata, false); 
        }
    }

    public function actionAddattribute()
    {
        // if (!$post = \Yii::$app->getRequest()->getBodyParams()) {
        //     throw new \yii\web\HttpException(400, 'Дані не отримані');
        // }
        // $attributeckassviewModel = new AttributeClassView();
        // if ($attributeckassviewModel->findByCommunityName($post['com_name'])){
        //     throw new \yii\web\HttpException(400, 'Користувач з таким логіном уже існує');
        // }
        // $com_name = $post['com_name'];
        // $com_num = $post['com_num'];
        // $com_adds = $post['com_adds'];

        // $attributeckassviewModel->name = $com_name;
        // $attributeckassviewModel->prefix = $com_num;
        // $attributeckassviewModel->notes = $com_adds;
        // if (!$attributeckassviewModel->save()){
        //     foreach($attributeckassviewModel->errors as $key){
        //         $errorMessage .= $key[0];
        //     }
        //     throw new \yii\web\HttpException(422,$errorMessage);
        // }
    }
}
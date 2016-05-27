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
    // public static function actionFindlastattributeid()
    // {
    //     $last_id = ResourceAttribute::find()
    //     ->where(['attribute_id' => ResourceAttribute::find()->max('attribute_id')])
    //     ->one();
    //     var_dump($last_id);
    //     $get_class_id->select(['attribute_id'])
    //     ->asArray();
    //     return self::buildPagination($get_class_id, false); 
    // }
    public function actionAddattribute()
    {
        $last_id = ResourceAttribute::find()->select(['attribute_id'])->orderBy(['attribute_id' => SORT_DESC])->one();
        $attribute_id = $last_id->attribute_id + 1;
        if (!$post = \Yii::$app->getRequest()->getBodyParams()) {
            throw new \yii\web\HttpException(400, 'Дані не отримані');
        }
        $resourceAttributeModel = new resourceAttribute();
        if ($resourceAttributeModel->findByAttributeName($post['attribute_name'])){
            throw new \yii\web\HttpException(400, 'Такий атрибут уже існує');
        }
        $attribute_name = $post['attribute_name'];
        $resourceAttributeModel->name = $attribute_name;
        $resourceAttributeModel->is_global = 0;
        if (!$resourceAttributeModel->save()){
            foreach($resourceAttributeModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }
        $attributeclassviewModel = new AttributeClassView();
        $class_id = $post['class_id'];
        $attributeclassviewModel->class_id = $class_id;
        $attributeclassviewModel->attribute_id = $attribute_id;
        if (!$attributeclassviewModel->save()){
            foreach($attributeclassviewModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }


    }
    public function actionDeleteattribute()
    {
        $request = \Yii::$app->request->get();
        $getdata = AttributeClassView::find()->where(['attribute_id'=>$request['attr_id']])->one();
        if($getdata){
            $getdata->delete();
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
    // public static function actionFindlastattributeid()
    // {
    //     $last_id = ResourceAttribute::find()
    //     ->where(['attribute_id' => ResourceAttribute::find()->max('attribute_id')])
    //     ->one();
    //     var_dump($last_id);
    //     $get_class_id->select(['attribute_id'])
    //     ->asArray();
    //     return self::buildPagination($get_class_id, false); 
    // }
    public function actionAddattribute()
    {
        $last_id = ResourceAttribute::find()->select(['attribute_id'])->orderBy(['attribute_id' => SORT_DESC])->one();
        $attribute_id = $last_id->attribute_id + 1;
        if (!$post = \Yii::$app->getRequest()->getBodyParams()) {
            throw new \yii\web\HttpException(400, 'Дані не отримані');
        }
        $resourceAttributeModel = new resourceAttribute();
        if ($resourceAttributeModel->findByAttributeName($post['attribute_name'])){
            throw new \yii\web\HttpException(400, 'Такий атрибут уже існує');
        }
        $attribute_name = $post['attribute_name'];
        $resourceAttributeModel->name = $attribute_name;
        $resourceAttributeModel->is_global = 0;
        if (!$resourceAttributeModel->save()){
            foreach($resourceAttributeModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }
        $attributeclassviewModel = new AttributeClassView();
        $class_id = $post['class_id'];
        $attributeclassviewModel->class_id = $class_id;
        $attributeclassviewModel->attribute_id = $attribute_id;
        if (!$attributeclassviewModel->save()){
            foreach($attributeclassviewModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }
    }
    public function actionDeleteattribute()
    {
        $request = \Yii::$app->request->get();
        $getdata = AttributeClassView::find()->where(['attribute_id'=>$request['attr_id']])->one();
        if($getdata){
            $getdata->delete();
        }
    }
}
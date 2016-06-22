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
        $request= \Yii::$app->request->post();
        $last_id = ResourceAttribute::find()->select(['attribute_id'])->orderBy(['attribute_id' => SORT_DESC])->one();
        $attribute_id = $last_id->attribute_id + 1;
        $post = array_merge(\Yii::$app->getRequest()->getBodyParams(), ['attribute_id' => $attribute_id]);
        $resourceAttributeModel = new \app\models\ResourceAttribute();
        $attributeclassviewModel = new \app\models\AttributeClassView();


        if ($resourceAttributeModel->findByAttributeName($post['name'])){
            $repeated_attr_id = ResourceAttribute::find()->select(['attribute_id'])->where(['name' => $post['name']])->asArray()->one();
            $post = array_merge(\Yii::$app->getRequest()->getBodyParams(), ['attribute_id' => $repeated_attr_id['attribute_id']]);

            foreach(['attributeclassviewModel' => new \app\models\AttributeClassView()] as $key => $value) {
                $value->setAttributes($post);
                if (!$value->validate()) {
                    foreach($value->errors as $key){
                        $errorMessage .= $key[0];
                    }
                    throw new \yii\web\HttpException(422,$errorMessage);
                } else 
                    $value->save();
            }
            
        } 

        else{
            foreach(['resourceAttributeModel' => new \app\models\ResourceAttribute(),
                 'attributeclassviewModel' => new \app\models\AttributeClassView()] as $key => $value) {
                $value->setAttributes($post);
                if (!$value->validate()) {
                    foreach($value->errors as $key){
                        $errorMessage .= $key[0];
                    }
                    throw new \yii\web\HttpException(422,$errorMessage);
                } else 
                    $value->save();
            }
        }
        
    }

    public function actionDeleteattribute()
    {
        $request = \Yii::$app->request->get();
        if(isset($request['attr_id'])){
            $getdata = AttributeClassView::findOne([
            'attribute_id' => $request['attr_id'],
            'class_id' => $request['class_id'],
        ]);
        } else{
            throw new \yii\web\HttpException(400, 'Дані не отримані');
        }
        if($getdata){
            $getdata->delete();
        }
    }
    public function actionFindfilteredattributes()
    {   
        $request= \Yii::$app->request->get();
        $preRequest = "SELECT name, class_id , activation_status FROM resource_class";
        $preData = \Yii::$app->db->createCommand($preRequest)->queryAll();
        $preArray = [];
        for($i = 0; $i < count($preData); $i++) {
            array_push($preArray, $preData[$i][name]);
        }
        $sql = "SELECT name, attribute_id 
                FROM resource_attribute 
                WHERE attribute_id IN (SELECT attribute_id 
                                        FROM attribute_class_view, resource_class 
                                        WHERE resource_class.class_id = attribute_class_view.class_id AND name=:name)";
        $arr = [];
        $array = [];
        for($i = 0; $i < count($preArray); $i++){
            $data = \Yii::$app->db
                ->createCommand($sql)
                ->bindValues([':name' => $preArray[$i]])
                ->queryAll();
            array_push($array, [$preData[$i]]);
            array_push($array[$i], $data);
        }
        array_push($arr, $array);
        return $arr;
    }

    public function actionFindallattributes()
    {
        $request= \Yii::$app->request->get();
        $attributes = [':class_id' => $request['class_id']];
        $sql = "SELECT name, attribute_id FROM resource_attribute WHERE attribute_id IN (SELECT attribute_id FROM attribute_class_view, resource_class WHERE resource_class.class_id = attribute_class_view.class_id AND resource_class.class_id=:class_id)";
        $data = \Yii::$app->db
                ->createCommand($sql)
                ->bindValues($attributes)
                ->queryAll();
        $getglobalattributes = ResourceAttribute::find()->where(['is_global' => '1'])
        ->asArray()->all();
        for($i = 0; $i < count($data); $i++){
            array_push($getglobalattributes, $data[$i]);
        }
        return $getglobalattributes;
    }


}
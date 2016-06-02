<?php
namespace app\controllers;
use app\controllers\AppController;
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
        $getdata = ResourceClass::find()->SELECT(['resource_class.class_id as class_ID','resource_class.name as res_name', 'resource_attribute.name as attr_name', 'resource_class.activation_status', 'resource_attribute.attribute_id as attr_id'])
            ->joinWith(['attributeClassView', 'attributeClassView.resourceAttribute']);
        
        if(isset($request['value'])){
            $getdata->andFilterWhere(['like', 'resource_class.class_id', $request['value']])
            ->asArray();
            return self::buildPagination($getdata,false); 
        }else{
            $getdata->joinWith(['attributeClassView', 'attributeClassView.resourceAttribute'])
            ->asArray();
            return self::buildPagination($getdata, false); 
        }
    }

    // add new resource class
    public function actionAddresourceclass() 
    {        
        if (!$post = \Yii::$app->getRequest()->getBodyParams()) 
        {
            throw new \yii\web\HttpException(204, 'Дані не отримані');
        }
        $resourceClassModel = new ResourceClass();
        if ($resourceClassModel->findByResourceClassName($post['res_class_name'])){
            throw new \yii\web\HttpException(400, 'Тип ресурсу з такою назвою вже існує');
        }
        $res_class_name = $post['res_class_name'];
        $last_class_id = ResourceClass::find()->select(['class_id'])->orderBy(['class_id' => SORT_DESC])->one();
        $new_class_id = $last_class_id -> class_id + 1;
        $resourceClassModel->class_id = $new_class_id;
        $resourceClassModel->name = $res_class_name;
        $resourceClassModel->activation_status = 1;
        if (!$resourceClassModel->save()){
            foreach($resourceClassModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }  
    }
}
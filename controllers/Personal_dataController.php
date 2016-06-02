<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\data\ActiveDataProvider;
use app\models\PersonalData;

class Personal_dataController extends ActiveController
{
    public $modelClass = 'app\models\PersonalData';

    public function behaviors()
    {
        return
        \yii\helpers\ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
            ],
        ]);
    }
    public function actionSearch(){
        $request= \Yii::$app->request->get();
        $param = [':passport_series' => $request['passport_series']];
        $sql = "SELECT personal_data.*, role_id, user_id FROM personal_data INNER JOIN user ON personal_data.personal_data_id = user.user_data_id WHERE passport_series = :passport_series";
        $data = \Yii::$app->db->createCommand($sql)->bindValues($param)->queryAll();
        return $data;
    }

}
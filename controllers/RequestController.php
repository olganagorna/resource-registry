<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use app\models\Request;
use app\models\RequestSearch;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\helpers\ArrayHelper;

/**
 * RequestController implements the CRUD actions for Request model.
 */
class RequestController extends AppController
{   
    public $modelClass = 'app\models\Request';

    public function behaviors()
    {
        return ArrayHelper::merge(parent::behaviors(), [
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'delete' => ['post'],
                ],
            ],
        ]);
    }

    public function actionShowrequest()
    {   
        $request= \Yii::$app->request->get();
        $info = Request::find();
        // request value is used for search options 
            // for user search by registrar
            // for registrar search by user
        if(isset($request['value'])){
            $info->select(['type', 'u2.username as username_s', 'create_time', 'user.username as username_r', 'complete_time', 'status'])
            ->innerJoinWith('sender')
            ->innerJoinWith('reciever')
            ->andFilterWhere(['like', 'u2.username', $request['value']])
            ->orderBy('status, create_time desc, complete_time desc')
            ->asArray();    
        // ordinary list show
        }else{
            $info->select(['type', 'u2.username as username_s', 'create_time', 'user.username as username_r', 'complete_time', 'status'])
            ->innerJoinWith('sender')
            ->innerJoinWith('reciever')
            ->orderBy('status, create_time desc, complete_time desc')
            ->asArray();
        }

        return self::buildPagination($info, $paginatio=5);
    }

    public function actionAddreq()
    {
        // Add request action. Variables should be changed
        $requestModel = new Request();
        $type = '0';
        $sender = '1';
        $reciever = '3';
        $status = '0';

        $requestModel->type = $type;
        $requestModel->sender = $sender;
        $requestModel->reciever = $reciever;
        $requestModel->status = $status;
        if (!$requestModel->save()){
            foreach($requestModel->errors as $key){
                $errorMessage .= $key[0];
            }
            throw new \yii\web\HttpException(422,$errorMessage);
        }
    }

    /**
     * Lists all Request models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new RequestSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Displays a single Request model.
     * @param integer $id
     * @return mixed
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Request model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return mixed
     */
    public function actionCreate()
    {
        $model = new Request();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->req_id]);
        } else {
            return $this->render('create', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Updates an existing Request model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id
     * @return mixed
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            return $this->redirect(['view', 'id' => $model->req_id]);
        } else {
            return $this->render('update', [
                'model' => $model,
            ]);
        }
    }

    /**
     * Deletes an existing Request model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param integer $id
     * @return mixed
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Request model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param integer $id
     * @return Request the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Request::findOne($id)) !== null) {
            return $model;
        } else {
            throw new NotFoundHttpException('The requested page does not exist.');
        }
    }
}

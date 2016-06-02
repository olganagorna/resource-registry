<?php

namespace app\controllers;

use Yii;
use yii\data\ActiveDataProvider;
use app\models\Request;
use app\models\RequestSearch;
use app\models\Role;
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
        $request = \Yii::$app->request->get();
        $view = \Yii::$app->user->identity->username;
        $viewRegistrar = \Yii::$app->user->identity->community_id;
        $roleName = Role::findOne(\Yii::$app->user->identity->role_id);
        if ($request['option'] == 2) { $username = 'u_s.username';} else { $username = 'user.username';}
        $info = Request::find();
        // request value is used for search options
        $info->select(['res_id', 'type', 'pd_s.last_name as last_name_s', 'pd_s.first_name as first_name_s', 'u_s.username as username_s', 'create_time', 'pd_r.last_name as last_name_r', 'pd_r.first_name as first_name_r', 'user.username as username_r', 'complete_time', 'status'])
        ->joinWith(['sender', 'reciever', 'sender.senderPersData', 'reciever.recieverPersData'])
        ->orderBy('status, create_time desc, complete_time desc')
        ->asArray();
        if ($roleName == is_string('registrar')) { 
            $info->andFilterWhere(['and', ['user.community_id' => $viewRegistrar], ['u_s.community_id' => $viewRegistrar]]);
            if (isset($request['value']) && isset($request['option'])) {
                $info->andFilterWhere(['like', $username, $request['value']]);
            };
        } else { 
            $info->andFilterWhere(['u_s.username' => $view]);
            if (isset($request['value'])) {
                $info->andFilterWhere(['like', $username, $request['value']]);
            };
        };
        

        return self::buildPagination($info, $pagination=5);
    }

    // public function actionAddreq()
    // {
    //     // Add request action. Variables should be changed
    //     $requestModel = new Request();
    //     $type = 0;
    //     $sender = 8;
    //     $reciever = 27; 
    //     $status = 0;

    //     $requestModel->type = $type;
    //     $requestModel->sender = $sender;
    //     $requestModel->reciever = $reciever;
    //     $requestModel->status = $status;
    //     if (!$requestModel->save()){
    //         foreach($requestModel->errors as $key){
    //             $errorMessage .= $key[0];
    //         }
    //         throw new \yii\web\HttpException(422,$errorMessage);
    //     }
    // }

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

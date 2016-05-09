<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Request;

/**
 * RequestSearch represents the model behind the search form about `app\models\Request`.
 */
class RequestSearch extends Request
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['req_id', 'res_id', 'type', 'sender', 'reciever', 'status'], 'integer'],
            [['create_time', 'complete_time'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Request::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->andFilterWhere([
            'req_id' => $this->req_id,
            'res_id' => $this->res_id,
            'type' => $this->type,
            'sender' => $this->sender,
            'create_time' => $this->create_time,
            'reciever' => $this->reciever,
            'complete_time' => $this->complete_time,
            'status' => $this->status,
        ]);

        return $dataProvider;
    }
}

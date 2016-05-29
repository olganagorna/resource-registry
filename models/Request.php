<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;

/**
 * This is the model class for table "requests".
 *
 * @property integer $req_id
 * @property integer $res_id
 * @property integer $type
 * @property integer $sender
 * @property string $create_time
 * @property integer $reciever
 * @property string $complete_time
 * @property integer $status
 *
 * @property User $reciever0
 * @property Resource $res
 * @property User $sender0
 */
class Request extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'request';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['res_id', 'type', 'sender', 'reciever', 'status'], 'integer'],
            [['type', 'sender', 'status'], 'required'],
            [['create_time', 'complete_time'], 'safe']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'req_id' => 'Req ID',
            'res_id' => 'Res ID',
            'type' => 'Type',
            'sender' => 'Sender',
            'create_time' => 'Create Time',
            'reciever' => 'Reciever',
            'complete_time' => 'Complete Time',
            'status' => 'Status',
        ];
    }

    /**
     * behavioral timestamp input for create and complete columns
     */
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['create_time'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['complete_time'],
                ],
                // // if you're using datetime instead of UNIX timestamp:
                // 'value' => new Expression('NOW()'),
            ],
        ];
    }

    public function fields(){
        return [
            'req_id',
            'res_id',
            'type',
            'sender',
            'create_time',
            'reciever',
            'complete_time',
            'status'
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getReciever()
    {
        return $this->hasOne(User::className(), ['user_id' => 'reciever']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getRes()
    {
        return $this->hasOne(Resource::className(), ['resource_id' => 'res_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSender()
    {
        return $this->hasOne(User::className(), ['user_id' => 'sender'])
            ->from(User::tableName() . ' u2');  // user table alias as u2, because of ambiguity
            // ->from(['u2' => User::tableName()]);
    }
}

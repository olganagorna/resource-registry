<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "community".
 *
 * @property integer $community_id
 * @property string $name
 * @property string $prefix
 * @property integer $commissioner_id
 * @property string $notes
 *
 * @property User $commissioner
 * @property User[] $users
 */
class Community extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'community';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['notes'], 'string'],
            [['isactive'], 'integer'],
            [['name'], 'string', 'max' => 50, 'message' => 'введіть строку не більше 50-ти символів'],
            [['prefix'], 'match', 'pattern' => '/^[0-9:]+$/', 'message' => 'введіть строку з чисел та символу :'],
            [['prefix'], 'string', 'max' => 13],
            [['prefix'], 'string', 'min' => 13]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'community_id' => 'Community ID',
            'name' => 'Name',
            'prefix' => 'Prefix',
            'notes' => 'Notes',
            'isactive' => 'Isactive',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCommissioner()
    {
        return $this->hasOne(User::className(), ['user_id' => 'commissioner_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function findUsers()
    {
        return $this->hasMany(User::className(), ['community_id' => 'community_id']);
    }
    public static function findByCommunityName($community_name)
    {
        //find Community in DB by Name
        return static::findOne(['name' => $community_name]);
    }
}

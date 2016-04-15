<?php

namespace app\models;

use Yii;

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
            [['commissioner_id'], 'required'],
            [['commissioner_id'], 'integer'],
            [['notes'], 'string'],
            [['name', 'prefix'], 'string', 'max' => 50]
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
            'commissioner_id' => 'Commissioner ID',
            'notes' => 'Notes',
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
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['community_id' => 'community_id']);
    }
    public static function findByCommunityName($community_name)
    {
        return static::findOne(['name' => $community_name]);
    }
}

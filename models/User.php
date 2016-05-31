<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface
{
    public static function tableName()
    {
        return 'user';
    }
    public function getUserRole() 
    {
        return $this->hasOne(Role::className(), ['role_id' => 'role_id']);
    }
    public function getPersonalData() 
    {
        return $this->hasOne(PersonalData::className(), ['personal_data_id' => 'user_data_id']);
    }
    public function getCommunity() 
    {
        return $this->hasOne(Community::className(), ['community_id' => 'community_id']);
    }
    public function rules()
    {
        return [
            [['username', 'email'], 'required'],
            [['username', 'password_hash', 'password_reset_token', 'email'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            [['email'], 'email'],
        ];
    }
    
    public function fields(){
        return [
            'id',
            'username',
            'user_data_id',
            'role_id',
            'community_id'
        ];
    }
    public static function findIdentity($id)
    {
        return static::findOne(['user_id' => $id]);
    }
    public static function findUserById($user_id)
    {
        // find user by id
        return static::findOne(['user_id' => $user_id]);
    }
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['auth_key' => $token]);
    }
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }
    public static function findByPasswordResetToken($token)
    {
        // if (!static::isPasswordResetTokenValid($token)) {
        //     return null;
        // }
        return static::findOne([
            'password_reset_token' => $token,
        ]);
    }
    // public static function isPasswordResetTokenValid($token)
    // {
    //     if (empty($token)) {
    //         return false;
    //     }
    //     $expire = Yii::$app->modules['auth'][passwordResetTokenExpire];
    //     $parts = explode('_', $token);
    //     $timestamp = (int) end($parts);
    //     return $timestamp + $expire >= time();
    // }
    public function getId()
    {
        return $this->getPrimaryKey();
    }
    public function getRole()
    {
        return $this->role_id;
    }
    public function getUserDataID()
    {
        return $this->user_data_id;
    }
    public function getAuthKey()
    {
        return $this->auth_key;
    }
    public static function getUserByUserName($username)
    {
        // Get user by username
       return static::findOne(['username' => $username]);
    }
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }
    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }
    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }
    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }
    public function getSenderPersData()
    {
        return $this->hasOne(PersonalData::className(), ['personal_data_id' => 'user_data_id'])
            ->select(['pd_s.last_name', 'pd_s.first_name'])
            ->from(PersonalData::tableName() . ' pd_s');
    }
    public function getRecieverPersData()
    {
        return $this->hasOne(PersonalData::className(), ['personal_data_id' => 'user_data_id'])
            ->select(['pd_r.last_name', 'pd_r.first_name'])
            ->from(PersonalData::tableName() . ' pd_r');  // personal_data table alias as pd2, because of ambiguity
            // ->from(['pd2' => PersonalData::tableName()]);
    }
}
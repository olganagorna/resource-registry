<?php
namespace app\models;

 use yii\db\ActiveRecord;

 class Admin extends ActiveRecord {

 	public static function tableName() {

 		return 'user';
 	}

 	public function getRole() {

        return $this->hasOne(Role::className(), ['role_id' => 'role_id']);
    }

    public function getPersonalData() {

        return $this->hasOne(PersonalData::className(), ['personal_data_id' => 'user_data_id']);
    } 
    

 }


?>
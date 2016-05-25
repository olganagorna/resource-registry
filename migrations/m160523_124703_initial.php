<?php

use yii\db\Schema;
use yii\db\Migration;

class m160523_124703_initial extends Migration
{
    public function up()
    {
        $this->msqli_query(file_get_contents(__DIR__ . '/../rr_dump_2305.sql'));
    }

    public function down()
    {
        // $this->dropTable('attribute_class_view');
        // $this->dropTable('backend_migration');
        // $this->dropTable('community');
        // $this->dropTable('coordinates');
        // $this->dropTable('operation');
        // $this->dropTable('operation_type');
        // $this->dropTable('parameter');
        // $this->dropTable('personal_data');
        // $this->dropTable('request');
        // $this->dropTable('resource');
        // $this->dropTable('resource_attribute');
        // $this->dropTable('resource_class');
        // $this->dropTable('role');
        // $this->dropTable('user');
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}

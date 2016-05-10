<?php

use yii\db\Schema;
use yii\db\Migration;

class m160502_162300_create_requests_table extends Migration
{
    public function up()
    {
        $this->createTable('requests', ['req_id'=>'pk', 'res_id'=>'integer', 'type'=>'smallint NOT NULL', 'sender'=>'integer NOT NULL', 'create_time'=>'integer', 'reciever'=>'integer', 'complete_time'=>'integer', 'status'=>'smallint NOT NULL',]);
        $this->addForeignKey ( 'fk_req_resource', 'requests', 'res_id', 'resource', 'resource_id', $delete = null, $update = null );
        $this->addForeignKey ( 'fk_req_sender', 'requests', 'sender', 'user', 'user_id', $delete = null, $update = null );
        $this->addForeignKey ( 'fk_req_reciever', 'requests', 'reciever', 'user', 'user_id', $delete = null, $update = null );
    }

    public function down()
    {
        $this->dropTable('requests');
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

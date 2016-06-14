<?php
namespace app\tests\phpunit_tests;

use app\controllers\AppController;
use app\controllers\CommunityController;
use PHPUnit\Framework\TestCase;

class CommunityControllerTest extends TestCase
{
    public function testAddComm()
    {
        $commObj = new CommunityController();

        $this->assertTrue($commObj->actionAddcomm() !== false);

        // $stack = [];
        // $this->assertEquals(0, count($stack));

        // array_push($stack, 'foo');
        // $this->assertEquals('foo', $stack[count($stack)-1]);
        // $this->assertEquals(1, count($stack));

        // $this->assertEquals('foo', array_pop($stack));
        // $this->assertEquals(0, count($stack));
    }
}
?>
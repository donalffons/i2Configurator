<?php

class HelloWorldTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var PDO
     */
    private $pdo;

    public function setUp()
    {
        $this->pdo = new PDO($GLOBALS['db_dsn'], $GLOBALS['db_username'], $GLOBALS['db_password']);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->query("CREATE TABLE hello (what VARCHAR(50) NOT NULL)");
    }

    public function tearDown()
    {
        $this->pdo->query("DROP TABLE hello");
    }

    public function testHelloWorld()
    {
        $this->assertEquals('Hello World', 'Hello World');
    }

    public function testHello()
    {
        $this->assertEquals('Hello World', 'Hello World');
    }

    public function testWhat()
    {
        $this->assertEquals('Hello World', 'Hello World');
    }
}


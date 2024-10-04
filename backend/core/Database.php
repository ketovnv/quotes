<?php
namespace backend\core;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $host = 'myapp-mysql';  // Имя контейнера MySQL
        $db = 'my_database';
        $user = 'root';
        $pass = 'p@55w0Rd';  // Используйте тот же пароль, что указан в docker-compose.yml
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";

        try {
            $this->connection = new PDO($dsn, $user, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}
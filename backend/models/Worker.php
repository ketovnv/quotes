<?php

namespace backend\models;

use Core\Database;

class Worker
{
    private $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    // Получаем список всех работников
    public function getAll()
    {
        $stmt = $this->db->query('SELECT * FROM работники');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    // Получаем список работников, не получивших зарплату в указанном месяце и году
    public function getWorkersWithoutSalary($month, $year)
    {
        $stmt = $this->db->prepare(
            'SELECT r.name
             FROM Worker r
             LEFT JOIN Salary z ON r.id = z.worker_id 
             AND EXTRACT(MONTH FROM z.date) = :month
             AND EXTRACT(YEAR FROM z.date) = :year
             WHERE z.worker_id IS NULL'
        );
        $stmt->execute([':month' => $month, ':year' => $year]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}

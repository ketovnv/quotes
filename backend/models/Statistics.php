<?php
namespace backend\models;

use PDO;

class Statistics {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    // Метод для получения записей с постраничной загрузкой
    public function getPaginated($limit, $offset) {
        $stmt = $this->db->prepare("SELECT * FROM statistics LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Метод для получения общего количества записей (для подсчета страниц)
    public function getTotalCount() {
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM statistics");
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    }

    // Метод для добавления новой записи
    public function create($data) {
        $sql = "INSERT INTO statistics (average, standard_deviation, mode_value, min_value, max_value, lost_quotes, calculation_start_time, calculation_time)
                VALUES (:average, :standardDeviation, :modeValue, :minValue, :maxValue, :lostQuotes, :calculationStartTime, :calculationTime)";
        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':average' => $data['average'],
            ':standardDeviation' => $data['standard_deviation'],
            ':modeValue' => $data['mode_value'],
            ':minValue' => $data['min_value'],
            ':maxValue' => $data['max_value'],
            ':lostQuotes' => $data['lost_quotes'],
            ':calculationStartTime' => $data['calculation_start_time'],
            ':calculationTime' => $data['calculation_time']
        ]);
    }

    // Метод для генерации фейковых данных
    public function fill() {
        for ($i = 0; $i < 1000; $i++) {
            $data = [
                'average' => rand(1500, 10000),
                'standard_deviation' => rand(100, 500),
                'mode_value' => rand(1500, 10000),
                'min_value' => rand(1500, 2000),
                'max_value' => rand(9000, 10000),
                'lost_quotes' => rand(0, 5),
                'calculation_start_time' => date("Y-m-d H:i:s"),
                'calculation_time' => rand(1, 10)
            ];
            $this->create($data);
        }
    }
}

<?php
use backend\models;

use PDO;

class Statistics {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    // метод для получения записей с постраничной загрузкой
    public function getPaginated($limit, $offset) {
        $stmt = $this->db->prepare("SELECT * FROM statistics LIMIT :limit OFFSET :offset");
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // метод для получения общего количества записей (для подсчета страниц)
    public function getTotalCount() {
        $stmt = $this->db->query("SELECT COUNT(*) as total FROM statistics");
        return $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    }

    // генерация
    public function fill(){
        for ($i = 0; $i < 1000; $i++) {
            $average = rand(1500, 10000);
            $standardDeviation = rand(100, 500);
            $modeValue = rand(1500, 10000);
            $minValue = rand(1500, 2000);
            $maxValue = rand(9000, 10000);
            $lostQuotes = rand(0, 5);
            $calculationStartTime = date("Y-m-d H:i:s");
            $calculationTime = rand(1, 10);

            $sql = "INSERT INTO statistics (average, standard_deviation, mode_value, min_value, max_value, lost_quotes, calculation_start_time, calculation_time)
            VALUES ('$average', '$standardDeviation', '$modeValue', '$minValue', '$maxValue', '$lostQuotes', '$calculationStartTime', '$calculationTime')";

            if ($this->db->query($sql) === TRUE) {
                echo "Данные успешно добавлены.\n";
            } else {
                echo "Ошибка: " . $this->db->error . "\n";
            }
        }
    }
}
<?php

namespace backend\controllers;

use backend\models\Statistics;

echo "StatisticsController is loaded\n";

class StatisticsController {
    private $model;

    public function __construct() {
        $this->model = new Statistics();
        echo "StatisticsController initialized\n";
    }

    // Метод для получения статистики с пагинацией
    public function index($page = 1) {
        echo "Index method called with page: $page\n";  // Для проверки
        $limit = 10;
        $offset = ($page - 1) * $limit;
        $data = $this->model->getPaginated($limit, $offset);
        $totalRecords = $this->model->getTotalCount();
        $totalPages = ceil($totalRecords / $limit);

        echo json_encode([
            'data' => $data,
            'page' => $page,
            'total_pages' => $totalPages,
            'total_records' => $totalRecords
        ]);
    }

    // Метод для добавления новой записи
    public function add() {
        echo "Add method called\n";  // Для проверк
        // Данные для добавления (получаем из POST или JSON тела)
        $data = json_decode(file_get_contents('php://input'), true);

        if (!empty($data)) {
            $this->model->create($data);
            echo json_encode(['message' => 'Data added successfully']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input data']);
        }
    }


}
// Вызов метода для проверки
$controller = new StatisticsController();
$controller->index(1);
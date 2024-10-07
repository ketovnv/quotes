<?php
namespace backend\controllers;

use backend\models\Statistics;

class StatisticsController {
    private $model;

    public function __construct() {
        $this->model = new Statistics();
    }

    // Метод для получения статистики с пагинацией
    public function index($page = 1) {
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
        // Получаем данные из запроса (POST)
        $data = json_decode(file_get_contents('php://input'), true);

        if (!empty($data)) {
            // Вызов метода создания новой записи
            $this->model->create($data);
            echo json_encode(['message' => 'Data added successfully']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input data']);
        }
    }
}

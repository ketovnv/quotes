<?php

namespace backend\controllers;

use backend\models\Worker;

class WorkerController {
    private $model;

    public function __construct() {
        $this->model = new Worker();
    }

    // Получение списка всех работников
    public function index() {
        $data = $this->model->getAll();
        echo json_encode($data);
    }

    // Получение работников без зарплаты за указанный месяц и год
    public function withoutSalary($month, $year) {
        $data = $this->model->getWorkersWithoutSalary($month, $year);
        echo json_encode($data);
    }
}

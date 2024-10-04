<?php

// автозагрузчик
require_once __DIR__ . './core/autoload.php';

// роутер


// 'url' из запроса
$url = isset($_GET['url']) ?? $_GET['url'];

// Вызываем роутер для обработки URL
router($url);
<?php

namespace Core;

function router($url)
{
    // Разбиваем URL на части
    $parts = explode('/', trim($url, '/'));

    // Имя контроллера — первая часть URL
    $controllerName = !empty($parts[0])
        ? 'backend\\controllers\\' . ucfirst(array_shift($parts)) . 'Controller'
        : 'backend\\controllers\\DefaultController';

    // Имя метода — вторая часть URL (действие)
    $methodName = !empty($parts) ? array_shift($parts) : 'index';

    // Оставшиеся части — параметры метода
    $params = !empty($parts) ? $parts : [];

    // Проверка наличия контроллера
    if (class_exists($controllerName)) {
        $controller = new $controllerName();

        // Проверка наличия метода в контроллере
        if (method_exists($controller, $methodName)) {
            // Вызов метода с параметрами
            call_user_func_array([$controller, $methodName], $params);
        } else {
            // Ошибка: метод не найден
            http_response_code(404);
            echo json_encode(['error' => 'Method not found']);
        }
    } else {
        // Ошибка: контроллер не найден
        http_response_code(404);
        echo json_encode(['error' => 'Controller not found']);
    }
}


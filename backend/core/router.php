<?php

namespace Core;

function router($url)
{
    try {


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
        {


            // Проверка наличия контроллера
            if (class_exists($controllerName)) {
                $controller = new $controllerName();
                if (method_exists($controller, $methodName)) {
                    $reflection = new \ReflectionMethod($controller, $methodName);
                    $expectedParams = $reflection->getNumberOfRequiredParameters();

                    if (count($params) >= $expectedParams) {
                        call_user_func_array([$controller, $methodName], $params);
                    } else {
                        http_response_code(400); // Ошибка: недостаточно параметров
                        echo json_encode(['error' => 'Insufficient parameters']);
                    }
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Method not found']);
                }
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
    } catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

}


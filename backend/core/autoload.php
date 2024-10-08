<?php

spl_autoload_register(function ($class) {
    $classPath = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    $filePath = __DIR__ . '/../' . $classPath;

    if (file_exists($filePath)) {
        require_once $filePath;
    } else {
        echo "Файл для класса $class не найден!";
    }
});

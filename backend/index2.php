<?php
// подключение к базе
$servername = "localhost";
$username = "root";
$password = "yourpassword";
$dbname = "my_database";

$conn = new mysqli($servername, $username, $password, $dbname);

// проверка
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// JSON данные
$data = json_decode(file_get_contents('php://input'), true);

// проверка наличия данных
if (!empty($data)) {
    $average = $data['average'];
    $standard_deviation = $data['standardDeviation'];
    $mode_value = $data['modeValue'];
    $min_value = $data['minValue'];
    $max_value = $data['maxValue'];
    $lost_quotes = $data['lostQuotes'];
    $calculation_start_time = $data['calculationStartTime'];
    $calculation_time = $data['calculationTime'];

    // SQL запрос для вставки данных
    $sql = "INSERT INTO statistics (average, standard_deviation, mode_value, min_value, max_value, lost_quotes, calculation_start_time, calculation_time)
    VALUES ('$average', '$standard_deviation', '$mode_value', '$min_value', '$max_value', '$lost_quotes', '$calculation_start_time', '$calculation_time')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Данные успешно сохранены']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка сохранения данных: ' . $conn->error]);
    }
}

// Закрываем соединение с базой данных
$conn->close();
?>

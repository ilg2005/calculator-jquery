<?php
header('Access-Control-Allow-Origin: *');

if (isset($_POST['meters'], $_POST['floor-number'], $_POST['material'])) {

    // Формируем массив для JSON ответа
    $result = array(
        'meters' => $_POST['meters'],
        'floor-number' => $_POST['floor-number'],
        'material' => $_POST['material'],
        'project' => $_POST['project']
    );

    // Переводим массив в JSON
    echo json_encode($result);
}



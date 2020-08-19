<?php

if (isset($_POST)) {
    echo json_encode(['success' => true, 'message' => 'Запрос успешно отправлен !', 'post' => $_POST]);
    die();
}



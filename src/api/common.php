<?php
$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "h5_1874";
     // 1.创建连接 $conn = new mysqli()
    $conn = new mysqli($servername, $username, $password, $dbname);
    // 2.检测连接
    if ($conn->connect_error) {
        // die("连接失败: " . $conn->connect_error);
    } 
?>
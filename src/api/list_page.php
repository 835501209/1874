<?php
include 'common.php';

$page = isset($_GET["currentPage"])? $_GET["currentPage"] : "";
$qty = isset($_GET["qty"])? $_GET["qty"] : "";

$sql = 'select * from product';
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);

// echo $page;

?>
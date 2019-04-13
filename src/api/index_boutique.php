<?php
include 'common.php';
 $sql = 'select * from boutique';
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
$row =json_encode($row,JSON_UNESCAPED_UNICODE);
echo $row;
?>
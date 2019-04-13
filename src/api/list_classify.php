<?php
include 'common.php';

$type = isset($_GET["type"])? $_GET["type"] : "";
$page = isset($_GET["currentPage"])? $_GET["currentPage"] : "";
$qty = isset($_GET["qty"])? $_GET["qty"] : "";
// $type = "phone";
$sql = 'select * from product';
 $result = $conn->query($sql);
 $row = $result->fetch_all(MYSQLI_ASSOC);
 $Arr = array();
//  $row =json_encode($row,JSON_UNESCAPED_UNICODE);
// $row = json_decode($row,true);
$j = 0;
if($type == "all"){
    $Arr = $row;
}
else{
    for($i=0;$i<count($row);$i++){
        if($row[$i]["type"] == $type){
        $Arr[$j] =  $row[$i];
        $j++;
        }
    }
}


$listArr = array_slice($Arr,($page-1)*$qty,$qty);
$data = array(
            "listArr" => $listArr,
            "len" => count($Arr),
            "page" => $page * 1,
            "qty" => $qty * 1 
        );





 $data =json_encode($data,JSON_UNESCAPED_UNICODE);
// $listArr = json_decode($listArr,true);
echo $data;
// var_dump($listArr);


?>
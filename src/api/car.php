<?php
include 'common.php';
$username = isset($_GET["user"])? $_GET["user"] : "";
$carlist = isset($_GET["carlist"])? $_GET["carlist"] : "";
 $sql = 'select * from Ztuan_users';
 $result = $conn->query($sql);
 $row = $result->fetch_all(MYSQLI_ASSOC);
// $row =json_encode($row,JSON_UNESCAPED_UNICODE);
 // $row = json_decode($row,true);
 if($carlist == ""){
    for($i=0;$i<count($row);$i++){
        if($row[$i]["username"] == $username){
            echo $row[$i]["carlist"];
            // return ;
        }
    }
}
else if($carlist != ""){
    // "UPDATE Ztuan_users SET carlist='".$carlist."' WHERE username='".$username."'";
    $res = $conn->query( "update Ztuan_users set carlist='".$carlist."' WHERE username='".$username."'");
    // $res = $conn->query( "insert into Ztuan_users (username,password,carlist) values ('".$username."','".$password."','')");
    // for($i=0;$i<count($row);$i++){
    //     if($row[$i]["username"] == $username){
    //         $row[$i]["carlist"] =$carlist;
    //         // return ;
    //     }
    // }
    // echo 4;
}

// echo $username;
// var_dump($row);

// echo $sql;

?>

<?php
include 'common.php';
$username = isset($_GET["user"])? $_GET["user"] : "";
$password = isset($_GET["password"])? $_GET["password"] : "";


$res = $conn->query("select * from Ztuan_users where username='".$username."' and password='".$password."'");
$num = $res->num_rows;
if($num ==1){
    echo 0;
}
else{
    echo 1;
}



// if($password ==""){
//     $res = $conn->query("select * from Ztuan_users where username='".$username."'");
//     $num = $res->num_rows;
//     if($num == 1){
//     echo 0;
//     }
//     else{
//         echo 1;
//     }
// }
// else{
//     $res = $conn->query( "insert into Ztuan_users (username,password) values ('".$username."','".$password."')");
// }
$res->close();
$conn->close();
?>
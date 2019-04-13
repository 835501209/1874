requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
        "verification_code"  : "../lib/verification_code"
    },
    shim : {
         "verification_code" : {
            deps : ["jquery"]
        },

    }
})

requirejs(["jquery", "verification_code"],function(){
     $(function() {

     //验证码部分
     var show_num = [];
     draw(show_num);

     $("#canvas").on('click', function() {
         draw(show_num);
     })
     var $user = "";
     var $password = "";
     var $ag = "";
     var val;
     var num;

     //验证用户名、密码部分
     $(".user").on("blur", function() {
         $user = $(".user").val()
         $.get("../api/sign.php?user=" + $user, function(res) {
            console.log(res);
             if (!/^[\u2E80-\u9FFF\da-zA-Z]{5,12}$/.test($user)) {
                 $("em")[0].innerText = "用户名不规范!";
                 $user = "";
             }
             else if(res==0){
                $("em")[0].innerText = "用户名已存在！";
                $user = "";
             }
              else {
                 $("em")[0].innerText = "";
             }
         }, 'JSON');

     })
     $(".password").on("blur", function() {
         $password = $(".password").val();
         if (!/^[\da-zA-Z]{6,12}$/.test($password)) {
             $("em")[1].innerText = "请按要求输入密码!";
             $password = "";
         } else {
             $("em")[1].innerText = "";
         }
     })
     $(".reput_password").on("blur", function() {
         $ag = $(".reput_password").val();
         if ($password == "") {
             $("em")[2].innerText = "先输入密码!";
             $ag = "";
             return;
         }
         if ($password == $ag) {
             $("em")[2].innerText = "";
         } else {
             $("em")[2].innerText = "密码不一致!";
             $ag = "";
         }
     })
     $(".input-val").on('blur', function() {
         val = $(".input-val").val().toLowerCase();
         num = show_num.join("");
         // if(val==''){
         //     console.log('请输入验证码！');
         // }else if(val == num){
         //    console.log('验证码成功！');
         //     $(".input-val").val('');
         //     // draw(show_num);

         // }else{
         //     console.log('验证码错误！请重新输入！');
         //     $(".input-val").val('');
         //     // draw(show_num);
         // }
     })
     $(".btn_sign").on("click", function() {

         if ($user == "") {
             alert("请先改正用户名");
             return;
         } else if ($password == "") {
             alert("请先改正密码");
             return;
         } else if ($ag == "") {
             alert("两次输入的密码不一致！");
             return;
         } else if (val != num) {
             alert("验证码不正确！");
             return;
         } else if ($("form :checked").length == 0) {
             alert("请同意我们的协议！");
         } else {
             $.get("../api/sign.php?user=" + $user+"&password="+$password, function(res) {
                // console.log(res);
            }, 'JSON');
             // alert("注册成功");
            window.localStorage.user = $user;
            window.localStorage.psaaword = $password;
              location.href = "../index.html";
         }
     })









     // $(".btn").on('click',function(){
     //     var val = $(".input-val").val().toLowerCase();
     //     var num = show_num.join("");
     //     if(val==''){
     //         alert('请输入验证码！');
     //     }else if(val == num){
     //         alert('提交成功！');
     //         $(".input-val").val('');
     //         // draw(show_num);

     //     }else{
     //         alert('验证码错误！请重新输入！');
     //         $(".input-val").val('');
     //         // draw(show_num);
     //     }
     // })
     // 
     // 

 })
})





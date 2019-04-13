requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
    },
    shim : {


    }
})

requirejs(["jquery"],function(){
    $(document).ready(function() {
        var $user ;
        var $password ;
        $(".login_user").focus(function() {
             $(this).addClass('login_active');
         });
        $(".login_user").on("blur", function() {
             $(this).removeClass('login_active');
             $user = $(".login_user").val();
         });
        $(".login_password").focus(function() {
             $(this).addClass('login_active');
         });
        $(".login_password").on("blur", function() {
             $(this).removeClass('login_active');
             $password = $(".login_password").val();
         });
        $(".btn_denglu").on("click",function(){
             $.get("../api/login.php?user=" + $user+"&password="+$password, function(res) {
                  if(res==0){
                    // window.cookie = "user="+$user;
                    // window.cookie = "password="+$password;
                    // $.cookie("user",$user);
                    //  $.cookie("password",$password);
                    window.localStorage.user = $user;
                    window.localStorage.psaaword = $password;
                    location.href = "../index.html";
                  }
                  else{
                    alert("用户名或密码错误！");
                  }
                }, 'JSON')
        })
    })
})



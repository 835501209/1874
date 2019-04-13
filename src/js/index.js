requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
        "slideshow" : "../lib/slideshow",
    },
    shim : {

       "slideshow" : {
            deps : ["jquery"]
        },
    }
})

requirejs(["jquery","slideshow"],function(){

        // $(document).ready(function() {
         $(".slideshow").gonoroer({
         width: 900,
         height: 300,
         manner: "horizontal",
         imgsrc: ["./images/banner1.jpg", "./images/banner2.jpg", "./images/banner3.jpg"],
     })

    var endTime = [];
     $i = 0;
     $bouti = $($(".bouti")[0]);
     //精品数据获取、渲染
     $.get("./api/index_boutique.php", function(res) {
         render(res);
     }, 'JSON')

     function render(arr) {
         $bouti.css("width", 300 * (arr.length + 4));
         for (i = 0; i < arr.length; i++) {
             $($(".bouti")[0]).append('<li><img src="./images/loading.jpg" data-src="' + arr[i].src + '"/><div class="title"><a href="##">' + arr[i].describe + '</a></div><div class="price">￥' + arr[i].price + '<span>￥' + arr[i].original + '</span></div><div class="shop_name"><a href="##">' + arr[i].shopname + '</a></div><div class="countdown">' + arr[i].countdown + '</div></li>');
         }
         $bouti.children().eq(0).clone(true).appendTo($bouti);
         $bouti.children().eq(1).clone(true).appendTo($bouti);
         $bouti.children().eq(2).clone(true).appendTo($bouti);
         $bouti.children().eq(3).clone(true).appendTo($bouti);
     }

     //精品动画
     $($(".you")[0]).on("click", function() {
         $i--;
         if ($i == -1) {
             $i = 5;
             $bouti.css("left", -1800);
         }
         $bouti.stop().animate({ "left": -300 * $i }, 500);
     })
     $($(".zuo")[0]).on("click", function() {
        
          $i++;
         if ($i == 7) {
             $i = 1;
             $bouti.css("left", 0);
         }
         $bouti.stop().animate({ "left": -300 * $i }, 500);
     })
     //产品数据获取、渲染
     $.get("./api/index_product.php", function(res) {
         for(i=0;i<9;i++){
            var random = getRandomNum(0,res.length-1);
           // console.log(res[random]);
            var cha = res[random].original-res[random].price;
            $($(".product_list")[0]).append('<li data-id ="'+ res[random].guid + '"><a href="##" ><div class="pic_img"><img src="./images/loading.jpg" data-src = "'+ res[random].src+'" alt="" /></div><div class="item_info"><p>' + res[random].product + '</p><p>' + res[random].describe + '</p><span>￥' + res[random].price + '</span><span>￥' + res[random].original + '</span><span>立省' + cha + '元</span><div class="item_btn">马上抢</div></div><div class="show_time"> 据结束仅剩<span class="time_num"></span>天<span class="time_num"></span>时<span class="time_num"></span>分<span class="time_num"></span>秒</div></a></li>');
            endTime[i] = new Date(res[random].time);
            res.splice(random,1); 
         }



         // 
         // for (i = 0; i < res.length; i++) {
         //        var cha = res[i].original-res[i].price;
         //        $($(".product_list")[0]).append('<li data-id ="'+ res[i].guid + '"><a href="##" ><div class="pic_img"><img src="' + res[i].src + '" alt="" /></div><div class="item_info"><p>' + res[i].product + '</p><p>' + res[i].describe + '</p><span>￥' + res[i].price + '</span><span>￥' + res[i].original + '</span><span>立省' + cha + '元</span><div class="item_btn">马上抢</div></div><div class="show_time"> 据结束仅剩<span class="time_num"></span>天<span class="time_num"></span>时<span class="time_num"></span>分<span class="time_num"></span>秒</div></a></li>');
         //        endTime[i] = new Date(res[i].time);
         // }
         // console.log(endTime.length);
        daojishi();
        setInterval(daojishi,1000);

        //点击商品跳转页面
        $($(".product_list")[0]).on("click","li",function(){
            window.localStorage.goods_id =  this.dataset.id;
             window.open("./html/goods.html");
        })
     }, 'JSON')

     //进入页面改变用户名
     if(window.localStorage.user != undefined &&window.localStorage.user != ""){
        $(".denglu").html('你好，<a><span >'+window.localStorage.user+'</span></a>');
        $(".sign").html('<a href="./index.html"><span>退出</span>')
     }
    
    $(".sign").on("click",function(){
        $(".denglu").html('HI，欢迎来到Z商城，请<a href="./html/login.html"><span >登录</span></a>');
        $(".sign").html('<a href="html/sign.html"><span>注册</span></a>')
        window.localStorage.user = "";
        window.localStorage.psaaword = "";
    })

    //购物车添加商品
    var rt  = window.localStorage.user;

    $.get("./api/car.php",{'user':rt}, function(res) {
            if(res==""|| res==undefined){
              window.localStorage.goodslist = "";
              //顶部购物车显示数量
               $(".top_carnum").text(0);
            }
            else{
               window.localStorage.goodslist = res ;  
               var arr =  $.parseJSON(window.localStorage.goodslist);
               //顶部购物车显示数量
                $(".top_carnum").text(arr.length);
            }
         })
    //进入购物车时判断
    $(".car_link").on("click",function(){
         if(window.localStorage.user == undefined ||window.localStorage.user == ""){
            // console.log(444);
            alert("请先登录！");
         }
         else{
            location.href = "./html/car.html";
         }
    })

    //页面懒加载
    var Allimg = document.images;
    setTimeout(function(){
        loadImg(Allimg);
    },120)
    window.onscroll = function(){
        loadImg(Allimg);
    }

    function loadImg(arr){
        for(i=0;i<arr.length;i++){
            if(arr[i].dataset.src != undefined){
                 if($(arr[i]).parent().offset().top<$(window).height()+$(document).scrollTop()-300){
                arr[i].src = arr[i].dataset.src;
                }
            }
           
        }
    }



    //倒计时部分
    function daojishi() {

        for (i = 0; i < endTime.length; i++) {
            var nowTime = new Date();
            var offsetMiao = parseInt((endTime[i].getTime() - nowTime.getTime()) / 1000);
            if (offsetMiao <= 0) {
                return;
            }

            var miao = offsetMiao % 60;
            var fenzhong = parseInt(offsetMiao / 60) % 60;
            var xiaoshi = parseInt(offsetMiao / 60 / 60) % 24;
            var tian = parseInt(offsetMiao / 60 / 60 / 24);

            $(".product_list .show_time").eq(i).children().eq(0).text(blink(tian));
            $(".product_list .show_time").eq(i).children().eq(1).text(blink(xiaoshi));
            $(".product_list .show_time").eq(i).children().eq(2).text(blink(fenzhong));
            $(".product_list .show_time").eq(i).children().eq(3).text(blink(miao));
            // 61秒   1分钟1秒
            // 121秒  2分钟1秒
            // 3599秒   59分钟59秒
            // 3600秒   1小时0分钟0秒
            // 3601秒 1小时0分钟1秒 //60 % 60 = 0
        }
    }

    //顶部进入购物车按钮事件
    $(".top_carnum").parent().on("click",function(){
         if(window.localStorage.user == undefined ||window.localStorage.user == ""){
            alert("请先登录！");
         }
         else{
            location.href = "./html/car.html";
         }
    })

    //倒计时时间保留2位有效数字
    function blink(num) {
        return num < 10 ? "0" + num : num;
    }
    //获取随机整数
    function getRandomNum(a,b){
    return parseInt(Math.random()*(b-a+1)+a);
    }

  

 // })

})
 















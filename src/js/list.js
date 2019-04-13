requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
    },
    shim : {

    }
})

requirejs(["jquery"],function(){
    // $(document).ready(function() {
    var kind = "all";
    var currentPage = 1;
    var endTime = [];
    var timer;
    request();

    //进入页面改变用户名
     if(window.localStorage.user != undefined &&window.localStorage.user != ""){
        $(".denglu").html('你好，<a><span >'+window.localStorage.user+'</span></a>');
        $(".sign").html('<a href="../index.html"><span>退出</span>')
     }
    
    $(".sign").on("click",function(){
        $(".denglu").html('HI，欢迎来到Z商城，请<a href="login.html"><span >登录</span></a>');
        $(".sign").html('<a href="sign.html"><span>注册</span></a>')
        window.localStorage.user = "";
        window.localStorage.psaaword = "";
    })


    //分类点击事件
    $(".classify_kind").on("click", "a", function() {
        if ($(this).data("kind") != undefined || $(this).data("kind") != "") {
            if ($(this).data("kind") != "all") {
                kind = $(this).data("kind");
            } else {
                kind = "all"
            }
            $("a[data-kind]").removeClass('acctive');
            $(this).addClass('acctive');
            currentPage = 1;
            request();
        }
    })
    $(".page").on("click", "span", function() {
        currentPage = $(this).text();
        $(".page span").removeClass('active');
        $(this).addClass('active');
        $.get("../api/list_classify.php", { 'type': kind, 'currentPage': currentPage, 'qty': 3 }, function(reg) {

            xuanran(reg);
        }, 'JSON')
    })

    // //顶部进入购物车按钮事件
    // $(".top_carnum").parent().on("click",function(){
    //     location.href = "../html/car.html"
    // })

    function request() {
        $.get("../api/list_classify.php", { 'type': kind, 'currentPage': currentPage, 'qty': 3 }, function(reg) {
            xuanran(reg);
            //添加页码部分
            $(".page").empty();
            var pageNum = Math.ceil(reg.len / reg.qty);
            for (var i = 1; i <= pageNum; i++) {
                $(".page").append('<span>' + i + '</span>');
            }
            $(".page").children().eq([reg.page - 1]).addClass("active");

        }, 'JSON')
    }

    function xuanran(reg) {
        clearInterval(timer);
        var res = reg.listArr;
        $($(".product_list")[0]).empty();

        for (i = 0; i < res.length; i++) {

            var cha = res[i].original - res[i].price;
            $($(".product_list")[0]).append('<li data-id ="' + res[i].guid + '"><a href="##" ><div class="pic_img"><img src=".' + res[i].src + '" alt="" /></div><div class="item_info"><p>' + res[i].product + '</p><p>' + res[i].describe + '</p><span>￥' + res[i].price + '</span><span>￥' + res[i].original + '</span><span>立省' + cha + '元</span><div class="item_btn">马上抢</div></div><div class="show_time">  据结束仅剩<span class="time_num"></span>天<span class="time_num"></span>时<span class="time_num"></span>分<span class="time_num"></span>秒</div></a></li>');
            endTime[i] = new Date(res[i].time);
        }
        daojishi();
        timer = setInterval(daojishi,1000);
    }
    //进入详情页
    $($(".product_list")[0]).on("click", "li", function() {
        window.localStorage.goods_id = this.dataset.id;
        // console.log(this.dataset.id);
        window.open("../html/goods.html");
    })



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
            // var my = blink(tian)+"天"+blink(xiaoshi)+"时"+blink(fenzhong)+"分"+blink(miao)+"秒";
            // console.log(my);

            $(".product_list .show_time").eq(i).children().eq(0).text(blink(tian));
            // console.log( $(".product_list .show_time").eq(i).children())
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
            location.href = "./car.html";
         }
    })
    //进入购物车时判断
    $(".car_link").on("click",function(){
         if(window.localStorage.user == undefined ||window.localStorage.user == ""){
            alert("请先登录！");
         }
         else{
            location.href = "./car.html";
         }
    })
    //进入页面获取购物车
    //顶部购物车显示数量     
    if(window.localStorage.goodslist != undefined  && window.localStorage.goodslist != ""){
        $(".top_carnum").text(($.parseJSON(window.localStorage.goodslist)).length);

    }
    

    function blink(num) {
        return num < 10 ? "0" + num : num;
    }



// });
})









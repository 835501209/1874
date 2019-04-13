requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
    },
    shim : {

    }
})

requirejs(["jquery"],function(){
    // $(document).ready(function(){
    var endTime = [];
    var timer ;

    //进入页面改变用户名
     if(window.localStorage.user != undefined &&window.localStorage.user != ""){
        $(".denglu").html('你好，<a><span >'+window.localStorage.user+'</span></a>');
        $(".sign").html('<a href="../index.html"><span>退出</span>')
     }
     $(".sign").on("click",function(){
        $(".denglu").html('HI，欢迎来到Z商城，请<a href="./html/login.html"><span >登录</span></a>');
        $(".sign").html('<a href="html/sign.html"><span>注册</span></a>')
        window.localStorage.user = "";
        window.localStorage.psaaword = "";
    })

     //购物车功能部分
    var rt  = window.localStorage.user;
    var carArr = $.parseJSON( window.localStorage.goodslist);
    //顶部购物车显示数量
    $(".top_carnum").text(carArr.length);
    render();

     $("table tbody").on("click",function(e){
        if(e.target.className == "jia"){
            var l = $(e.target).prev().val();
            l++;
            $(e.target).prev().val(l);
           transfer(e.target,l);
        }
        else if(e.target.className == "jian"){
            var l = $(e.target).next().val();
            if(l<1){
               alert("商品为0！") ;
               return;
            }
            l--;
            $(e.target).next().val(l);
             transfer(e.target,l);
        }
        else if(e.target.className == "del"){
            var $grandfather =  $(e.target).parent().parent();
            var cy =  $grandfather.data("cy");
            $grandfather.remove();
             carArr.splice(cy,1);
            window.localStorage.goodslist = JSON.stringify(carArr);
            var hc = JSON.stringify(carArr);
            $.get("../api/car.php",{'user':rt,'carlist':hc}, function(res) {
            })
             render();
        }
      
    })


    function transfer(en,l){
        var cy =  $(en).parent().parent().data("cy");
        carArr[cy].qty = l;
        window.localStorage.goodslist = JSON.stringify(carArr);
        var hc = JSON.stringify(carArr);
        $.get("../api/car.php",{'user':rt,'carlist':hc}, function(res) {
        })
         render();
    }

    function render(){
        carArr = $.parseJSON( window.localStorage.goodslist);

        //顶部购物车显示数量
        $(".top_carnum").text(carArr.length);
        $("table tbody").empty();
        $.get("../api/index_product.php", function(res) {
            clearInterval(timer);
            var total =0 ;
            for(i=0;i<carArr.length;i++){ 
                var j = carArr[i].guid-1;
                $("table tbody").append('<tr data-cy='+i+'><td><a><img src=".'+res[j].src+'" height="82" width="82" alt="" /></a><div class="inforgoods"><p>'+res[j].product+'</p><p>店铺：'+res[j].shopname+'</p><p>套装：官方标配</p></div></td><td><p>'+res[j].original+'</p><p>'+res[j].price+'</p></td><td><input type="button" class="jian"  value="-" /><input type="text" readonly="readonly" value="'+carArr[i].qty+'"/><input type="button" class="jia" value="+"/></td><td><span></span>天<span></span>小时<span></span>分<span></span>秒</td><td>'+(res[j].price*carArr[i].qty)+'</td><td><input type="button" class="del" value="删除"/></td></tr>')
                total+= res[j].price*carArr[i].qty;
                endTime[i] = new Date(res[j].time); 
                
            }
            $(".total_price").html("￥"+total);  
            daojishi();
            timer = setInterval(daojishi,1000);
        },'JSON')
      
        
    }


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
            // console.log( $("table tbody tr").children().eq(3).children().eq(0));
            $("table tbody tr").eq(i).children().eq(3).children().eq(0).text(blink(tian));
            $("table tbody tr").eq(i).children().eq(3).children().eq(1).text(blink(xiaoshi));
            $("table tbody tr").eq(i).children().eq(3).children().eq(2).text(blink(fenzhong));
            $("table tbody tr").eq(i).children().eq(3).children().eq(3).text(blink(miao));
            // 61秒   1分钟1秒
            // 121秒  2分钟1秒
            // 3599秒   59分钟59秒
            // 3600秒   1小时0分钟0秒
            // 3601秒 1小时0分钟1秒 //60 % 60 = 0
        }
    }
     function blink(num) {
        return num < 10 ? "0" + num : num;
    }

    //顶部进入购物车按钮事件
    $(".top_carnum").parent().on("click",function(){
        location.href = "./html/car.html"
    })
// })
})




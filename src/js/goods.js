requirejs.config({
    paths : {
        "jquery"  : "../lib/jquery-3.0.0",
        "magnifying" :  "../lib/magnifying-glass2.0.1"
    },
    shim : {
         "magnifying" : {
            deps : ["jquery"]
        },

    }
})

requirejs(["jquery", "magnifying"],function(){
    $(document).ready(function() {
    var rt  = window.localStorage.user;
    var arr;
    var timer;
    var endTime;
    $(".product_num").val(1);
    //进入页面改变用户名
    if (window.localStorage.user != undefined && window.localStorage.user != "") {
        $(".denglu").html('你好，<a><span >' + window.localStorage.user + '</span></a>');
        $(".sign").html('<a href="goods.html"><span>退出</span>')
    }

    $(".sign").on("click", function() {
        $(".denglu").html('HI，欢迎来到Z商城，请<a href="login.html"><span >登录</span></a>');
        $(".sign").html('<a href="sign.html"><span>注册</span></a>')
        window.localStorage.user = "";
        window.localStorage.psaaword = "";
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


    //购物车事件
    $.get("../api/car.php",{'user':rt}, function(res) {
            if(res==""|| res==undefined){
              window.localStorage.goodslist = "";
               arr = [];
               //顶部购物车显示数量
                $(".top_carnum").text(0);
            }
            else{
               window.localStorage.goodslist = res ;  
                arr =  $.parseJSON(window.localStorage.goodslist);
                //顶部购物车显示数量
                $(".top_carnum").text(arr.length);
            }
         })

    var num = window.localStorage.goods_id - 1;
    $.get("../api/index_product.php", function(res) {
        //商品图片放大镜部分
        // console.log(typeof(res[num].time));
        endTime = new Date(res[num].time);  
         daojishi();
        setInterval(daojishi,1000);

      
        // $(".goods_img").fangda($(".goods_img"), {
        //     width: 400,
        //     height: 400,
        //     imgsrc: ["." + res[num].src, "." + res[num].src, "." + res[num].src, "." + res[num].src]
        // });
         
         
         
         
        // 放大镜插件
        $(".goods_img").fangda($(".goods_img"),{      //($(".goods_img")为放置原图、小图、放大图的外层盒子
                // minPlace: "top",                   //小图位置、left、top、right、默认bottom
                // position:"inner",                     //放大图位置,不写默认在原图旁边，inner为原图内展示
                fangda : [{                           //放大盒子属性，可写类名，样式
                            width:400,
                            height:400,
                            // left:0,
                            // top:0,
                }],
                big   : [{                              //原图盒子属性，可写类名，样式,放置的图片数组
                            width:400,
                            height:400,
                            overflow:"hidden",
                            // class: "kun",
                }],
                min  : [{                               //放大盒子属性，可写类名，样式,放置的图片数组
                            width:90,
                            height:90, 
                            class: "minimg"  , 
                            "margin-top"  : 20,  
                }],
                move : [{   
                            width: 150,
                            height:150,
                            background:"#ccc",
                            opacity: 0.3,
                }],
                 imgsrc: ["." + res[num].src, "." + res[num].src, "." + res[num].src, "." + res[num].src]           //放置的图片数组,优先级低于big[]和min[]
            });

        //放大镜小图点击事件
        console.log($(".minimg"));
        $(".minimg").on("click","img",function(){
            $(".minimg img").css("border","1px solid #e3e3e3");
            $(this).css("border","1px solid #FF0000");
        })




        //商品其他属性渲染
        $(".goods_buy h3").append(res[num].product + '<br /><span>' + res[num].describe + '</span>');
        $(".goods_buy .group_price").append('<span class="group_goods_pricce">￥' + res[num].price + '</span><span>￥' + res[num].original + '</span><span>立省' + (res[num].original - res[num].price) + '元</span>');
        $(".shop_name").append(res[num].shopname);

        //加入购物车部分
        $(".car_btn").on("click", function() {
            // console.log(arr);
            var pro_res = Number($(".product_num").val());
            var pd = arr.some(function(item) {
                if (item.guid == res[num].guid) {
                    item.qty +=pro_res;
                    return item.guid == res[num].guid;
                }
            })
            if (!pd) {
                var obj = {};
                obj.guid = res[num].guid;
                obj.qty = pro_res;
                arr.push(obj);
            } 
            //顶部购物车显示数量
            $(".top_carnum").text(arr.length);


            //弹窗部分 
            $(".tanchuang").css("display","block");
            $(".tanchuang p span").eq(0).text(arr.length);
            var total = 0;
            for(o=0;o<arr.length;o++){
                var p = arr[o].guid - 1 ;
                total+=arr[o].qty*res[p].price;
            }
            $(".tanchuang p span").eq(1).text(total);
            move();
            var hc = JSON.stringify(arr);
            window.localStorage.goodslist = hc;

           
            
            // console.log(window.localStorage.goodslist);
            $.get("../api/car.php",{'user':rt,'carlist':hc}, function(res) {
         })
        })
    }, 'JSON')
    
    $(".add_btn").on("click",function(){
        var k = Number($(".product_num").val());
        k+=1;
        $(".product_num").val(k);
    })
     $(".sub_btn").on("click",function(){
        if($(".product_num").val()<=1){
            return;
        }
        var k = Number($(".product_num").val());
        k-=1;
        $(".product_num").val(k);
    })


     //关闭弹窗
     $(".close").on("click",function(){
        $(".tanchuang").css("display","none");
     })
     $(".tanchuang input").eq(1).on("click",function(){
        $(".tanchuang").css("display","none");
    })
     //弹窗内进入购物车
     $(".tanchuang input").eq(0).on("click",function(){
       if(window.localStorage.user == undefined ||window.localStorage.user == ""){
            alert("请先登录！");
         }
         else{
            location.href = "./car.html";
         }
     })
     //获取窗口可视区域
     $(window).resize(function(){
        move();
    });
    //顶部进入购物车按钮事件
    $(".top_carnum").parent().on("click",function(){
         if(window.localStorage.user == undefined ||window.localStorage.user == ""){
            alert("请先登录！");
         }
         else{
            location.href = "./car.html";
         }
    })
     


    function move(){
        var yy = $(window).height()/2-100; 
        var xx = $(window).width()/2-215; 
        $(".tanchuang").css("left",xx);
        $(".tanchuang").css("top",yy);
    }

        

     function daojishi(){

        var nowTime = new Date();
        var offsetMiao = parseInt((endTime.getTime() - nowTime.getTime())/1000);
        // console.log(offsetMiao);
        if(offsetMiao <= 0){
            // clearInterval(timer);
            // countDown.style.display = 'none';
            // btnBuy.src = "../images/btn_buy.jpg";
            return;
        }

        var miao = offsetMiao % 60;
        var fenzhong = parseInt(offsetMiao/60) % 60;
        var xiaoshi = parseInt(offsetMiao/60/60) % 24;
        var tian = parseInt(offsetMiao/60/60/24);
        // var my = blink(tian)+"天"+blink(xiaoshi)+"时"+blink(fenzhong)+"分"+blink(miao)+"秒";
        // console.log(my);
        $(".time_num").eq(0).text(blink(tian));
        $(".time_num").eq(1).text(blink(xiaoshi));
        $(".time_num").eq(2).text(blink(fenzhong));
        $(".time_num").eq(3).text(blink(miao));
        // 61秒   1分钟1秒
        // 121秒  2分钟1秒
        // 3599秒   59分钟59秒
        // 3600秒   1小时0分钟0秒
        // 3601秒 1小时0分钟1秒 //60 % 60 = 0
    }

    function blink(num){
        return num<10? "0"+num : num;
    }

})


})




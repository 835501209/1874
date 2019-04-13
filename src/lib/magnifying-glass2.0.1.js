

// 放大镜插件用法（基于jquery,记得引入jq文件）：


// $(".goods_img").fangda($(".goods_img"),{      //($(".goods_img")为放置原图、小图、放大图的外层盒子
//         minPlace: 'bottom',                   //小图位置、left、top、right、默认bottom
                         
//         position:"inner",                     //放大图位置,不写默认在原图旁边，inner为原图内展示
//         
//         fangda : [{                           //放大盒子属性，可写类名，样式
//                     width:400,
//                     height:400,
//                     // left:0,
//                     // top:0,
//         }],
//         big   : [{                              //原图盒子属性，可写类名，样式,放置的图片数组
//                     width:400,
//                     height:400,
//                     overflow:"hidden",
//         }],
//         min  : [{                               //小图片盒子属性，宽高为小图的，可写类名，样式,放置的图片数组
//                     width:90,
//                     height:90, 
//                     class: "kkkk"  ,     
//         }],
//         imgsrc: ["src","src","src"],            //放置的图片数组,优先级低于big[]和min[]
//     });





jQuery.prototype.fangda = function($ele, opt) {
    defaults = {
        minPlace: 'bottom',
        imgsrc :   [] ,
        position :"outside", //inner
        fangda:[{
            width: 400,
            height: 400,
            position: "absolute",
            left : 400,
            top : 0 ,
            overflow : "hidden",
            display:"none",
                }],
        big:[{
            width: 400,
            height: 400,
            position: "relative",
            imgsrc :   [] ,
                }],
        min:[{
            width: 400,
            height: 400, 
            imgsrc :   [] ,   
                }],
        move:[{
            width:200,
            height:200,   
            position: "absolute", 
            display:"none",
        }],


    } 
    var newOpt = Object.assign({}, defaults, opt);
    var newOpt1 = Object.assign({}, defaults.fangda[0], newOpt.fangda[0]);
    var newOpt2 = Object.assign({}, defaults.big[0], newOpt.big[0]);
    var newOpt3 = Object.assign({}, defaults.min[0], newOpt.min[0]);
    var newOpt4 = Object.assign({}, defaults.move[0], newOpt.move[0]);
    newOpt.fangda[0] = newOpt1;
    newOpt.big[0] = newOpt2;
    newOpt.min[0] = newOpt3;
    newOpt.move[0] = newOpt4;


    /*==================     初始化      ====================*/
    var init =  ()  => {

        // $ele.css("position", "relative");
        $(".active").css("z-index",1);
       

         /*==================     构建正常盒      ====================*/
        $dv1 = $('<div></div>');   
        var len1 = Object.keys(newOpt.big[0]) ;
        for(i=0;i<len1.length;i++){
            if(len1[i]=="class"){
                $dv1.addClass(newOpt.big[0][len1[i]]);
            }
            $dv1.css(len1[i],newOpt.big[0][len1[i]]);
        }
        $ele.append($dv1);


        /*==================     构造移动块      ====================*/
        $span = $("<span/>");
        var len4 = Object.keys(newOpt.move[0]) ;
        for(i=0;i<len4.length;i++){
            if(len4[i]=="class"){
                $span.addClass(newOpt.move[0][len4[i]]);
            }
            $span.css(len4[i],newOpt.move[0][len4[i]]);
        }
        $span.css("z-index",3);
        $dv1.append($span);


        /*==================     构建放大盒子      ====================*/
        $dv2 = $('<div></div>');   
        var len2 = Object.keys(newOpt.fangda[0]) ;   
        for(i=0;i<len2.length;i++){ 
            if(len2[i]=="class"){
                $dv2.addClass(newOpt.fangda[0][len2[i]]);
            }
            $dv2.css(len2[i],newOpt.fangda[0][len2[i]]);
        }
        $dv2.css("z-index",4);

        //判断放大位置
        if(newOpt.position == "inner"){
            $dv1.append($dv2);
            $dv2.css("width",newOpt.big[0].width);
            $dv2.css("height",newOpt.big[0].height);
            $dv2.css("left",0).css("top",0);
        }
        // else if(newOpt.fangda[0])
        else{
            $ele.append($dv2);
        }

        
        

        /*==================     构建小盒子      ====================*/
        $dv3 = $('<div></div>');   
        var len3 = Object.keys(newOpt.min[0]) ;
        // console.log(newOpt.big[0])
        for(i=0;i<len3.length;i++){
            if(len3[i]=="class"){
                $dv3.addClass(newOpt.min[0][len3[i]]);
            }
            $dv3.css(len3[i],newOpt.min[0][len3[i]]); 
        }
        var lorg = newOpt.imgsrc.length;
        if(newOpt.min[0].imgsrc.length!=0){
             lorg = newOpt.min[0].imgsrc.length;
        }


       /*==================    判断小图相对大图位置    ====================*/
        if (newOpt.minPlace == 'top'){
            $dv3.css("width",newOpt.big[0].width);
            $ele.prepend($dv3);
        }
        else if (newOpt.minPlace == 'left'){
            $dv1.css("float","left");
            $dv3.css("height",newOpt.big[0].height);
            $dv3.css("float","left");
            $ele.prepend($dv3);
        }
        else if (newOpt.minPlace == 'right'){
            $dv1.css("float","left");
            $dv3.css("height",newOpt.big[0].width);
            $dv3.css("float","left");
            $ele.append($dv3);
        }
        else if (newOpt.minPlace == 'bottom'){
            $dv3.css("width",newOpt.big[0].width);
            $ele.append($dv3); 
        }

    /*==================     插入图片      ====================*/
       
    //外层没有传图片
    if(newOpt.imgsrc.length == 0 ){
        if(newOpt.min[0].imgsrc.length == 0){
            //小图没图片，大图有图片
             if(newOpt.big[0].imgsrc.length != 0){
                 $img2 =$('<img src="'+newOpt.big[0].imgsrc[0]+'">');
                for(i=0;i<newOpt.big[0].imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.big[0].imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);

                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.big[0].imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
            //小图没图片，大图也没有图片
            else{
                alert("缺少图片！");
            }
        }
        else{       
            //小图有图片，大图没图片
            if(newOpt.big[0].imgsrc.length == 0){
                $img2 =$('<img src="'+newOpt.min[0].imgsrc[0]+'">')
                for(i=0;i<newOpt.min[0].imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.min[0].imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);

                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.min[0].imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
            //小图有图片，大图也有图片
            else{
                $img2 =$('<img src="'+newOpt.big[0].imgsrc[0]+'">')
                for(i=0;i<newOpt.big[0].imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.big[0].imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);
                 }
                for(i=0;i<newOpt.min[0].imgsrc.length;i++){
                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.min[0].imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
        }
    }
    //外层传入图片
    else{
        if(newOpt.min[0].imgsrc.length == 0){
            //小图没图片，大图有图片
             if(newOpt.big[0].imgsrc.length != 0){
                $img2 =$('<img src="'+newOpt.big[0].imgsrc[0]+'">')
                for(i=0;i<newOpt.big[0].imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.big[0].imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);
                 }
                for(i=0;i<newOpt.imgsrc.length;i++){
                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
            //小图没图片，大图也没有图片
            else{
                $img2 =$('<img src="'+newOpt.imgsrc[0]+'">')
                 for(i=0;i<newOpt.imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);
                 }
                for(i=0;i<newOpt.imgsrc.length;i++){
                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
        }
        else{       
            //小图有图片，大图没图片
            if(newOpt.big[0].imgsrc.length == 0){
                $img2 =$('<img src="'+newOpt.imgsrc[0]+'">')
                 for(i=0;i<newOpt.imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);
                 }
                for(i=0;i<newOpt.min[0].imgsrc.length;i++){
                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.min[0].imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
            //小图有图片，大图也有图片
            else{
                $img2 =$('<img src="'+newOpt.big[0].imgsrc[0]+'">')
                for(i=0;i<newOpt.big[0].imgsrc.length;i++){
                    //正常图插入
                     var $img1 = $('<img src="' + newOpt.big[0].imgsrc[i] + '">')
                    $img1.css("width",newOpt.big[0].width).css("height",newOpt.big[0].height).css("position","absolute");
                    $dv1.append($img1);
                 }
                for(i=0;i<newOpt.min[0].imgsrc.length;i++){
                    //插入小图
                    var $img3 = $('<img data-id="'+i+'" src="' + newOpt.min[0].imgsrc[i] + '">')
                    $img3.css("width",newOpt.min[0].width).css("height",newOpt.min[0].height)
                    $dv3.append($img3);
                }
            }
        }
    }

    var radio = newOpt.big[0].width/newOpt.move[0].width;            //滑动块与图片的比例
    var size = $dv2.width()*radio/newOpt.big[0].width;    //图片与放大图的比例 

    /*==================     插入放大图      ====================*/
    $img2.css("position","absolute").css("width",newOpt.fangda[0].width*radio).css("height",newOpt.fangda[0].height*radio);
    $dv2.append($img2);


    /*==================     移动事件      ====================*/
   
    $dv1.on("mouseenter" ,function() {
    $dv2.css("display", "block");
    $span.css("display", "block");
    $dv1.on("mousemove", function(e) {
        var xx = e.pageX - $dv1.offset().left - $span.width() / 2;
        var yy = e.pageY - $dv1.offset().top - $span.height() / 2;
        if (xx + $span.width() >= $dv1.width()) {
            xx = $dv1.width() - $span.width();
        }
        if (xx <= 0) {
            xx = 0;
        }
        if (yy + $span.height() >= $dv1.height()) {
            yy = $dv1.height() - $span.height();
        }
        if (yy <= 0) {
            yy = 0;
        }
        $img2.css("left", -size * xx).css("top", -size * yy);
        $span.css("left", xx).css("top", yy);
        })
    })
    $dv1.on("mouseleave", function() {
        $dv2.css("display", "none");
        $span.css("display", "none");
    })
     $dv1.children("img").eq(0).addClass("active");
     $(".active").css("z-index",2);
     $dv3.on("click","img" , function() {
        $dv1.children("img").removeClass("active");
        $dv1.children("img").addClass("fade");
        var t = $(this).data("id");
        $dv1.children("img").eq(t).removeClass("fade");
        $dv1.children("img").eq(t).addClass("active");
         $(".active").css("z-index",2);
          $(".fade").css("z-index",1);
          $img2.attr("src", $(".active").attr("src"));
    })



    }
   
 
    init();
}
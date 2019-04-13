jQuery.prototype.gonoroer = function(opt){
    defaults = {
        width: 400,
        height : 260,
        imgsrc : [] ,
        idx : 0,
        manner : "vertical",
    }
    var newOpt = Object.assign({},defaults,opt);
    var len = newOpt.imgsrc.length;
    var init = ()=>{
        $ul = $("<ul/>");
        $ul.appendTo($(".slideshow")).addClass('gonoro');
        for(i=0;i<len;i++){
            $('<img src="'+newOpt.imgsrc[i]+'"/>').width(newOpt.width).height(newOpt.height).appendTo($("<li></li>")).appendTo($ul);
        }
        if(newOpt.manner == "horizontal"){
            $ul.addClass('float');
            $ul.css("width",newOpt.width*(len+1));
            $ul.children().first().clone(true).appendTo($ul);
        }
        else{
            $ul.children().first().clone(true).appendTo($ul);
        }
        $(".slideshow").width(newOpt.width).height(newOpt.height);
        setInterval(function(){
            newOpt.idx++;
            if(newOpt.manner == "horizontal"){
                if(newOpt.idx ==len+1){
                    newOpt.idx = 1;
                    $ul.css("left",0);
                }
                $ul.animate({"left":-newOpt.idx*newOpt.width},500)
            }
            else{
                if(newOpt.idx==len+1){
                    newOpt.idx = 1;
                    $ul.css("top",0);
                }
                $ul.animate({"top":-newOpt.idx*newOpt.height},500)
            }
            },2000)
        
    }
    init();

         
}

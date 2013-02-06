define(function(require, exports, module) {
    var $=require("../../sea-modules/gallery/jquery/1.7.2/jquery");
    function calProgress(current,total){
        if(current<=total){
            var factor=current/total;
            var pct=Math.ceil(factor*100);
           // $("#slider:first-child").text(pct+"%");
            //$("#sliderWrapper:first-child").text(pct+"%");
            document.getElementById("sliderWrapper").firstChild.nodeValue=pct+"%";
            document.getElementById("slider").firstChild.nodeValue=pct+"%";
            document.getElementById("slider").style.clip="rect(0px "+parseInt(factor*417)+"px 16px 0)";
//            $("#slider").css("clip","rect(0px "+parseInt(factor*417)+"px 16px 0)");
        }
    }
    function hideProgressBar(){
        $("#progressBar").hide();
        calProgress(0,0);
    }
    var loopObject={start:0,end:10,current:0,interval:null};
    function progress(){
        if(loopObject.current<=loopObject.end){
            calProgress(loopObject.current,loopObject.end);
            loopObject.current+=Math.random();
            loopObject.interval=setTimeout(progress,700);
        }else{
            calProgress(loopObject.end,loopObject.end);
            loopObject.current=0;
            loopObject.interval=null;
            setTimeout(hideProgressBar,500);
        }
    }
    var obj={
        do:progressBar
    }
    module.exports = function(){
        progress();
    };
});


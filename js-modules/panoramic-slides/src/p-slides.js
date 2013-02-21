define(function(require, exports, module) {
    var $=require("../../sea-modules/gallery/jquery/1.7.2/jquery.js");
    var PSlides;
    var scrollInBox,scrollImg,scrollImgCopy,scrollOutBox,timeout=0;

    PSlides={
        initialize:function(options){
            scrollInBox=$(options.element);
            scrollImg=scrollInBox.children("img");
            scrollOutBox=scrollInBox.parent();
            console.log(scrollImg.attr("src"));
            scrollImgCopy=scrollImg.clone();
            //copy the image into container
            scrollImgCopy.appendTo(scrollInBox);
            this.resetImg();

        },
        resetImg:function(){
            var picListItemLink=$("#picListItem li a");
            var oThis = this,imgUrl=picListItemLink[1].getAttribute("imgurl");
            console.info(imgUrl);
            scrollImg.attr("src",imgUrl);
            scrollImgCopy.attr("src",imgUrl);
            var resetImg = new Image();
            resetImg.setAttribute("src",imgUrl);

            resetImg.onload = function(){
                //reset img location middle
               oThis.resetMiddle();

                $("#pic360load").hide();

                oThis.timeout = setInterval(function(){
                    oThis.prev(oThis);
                },16);
            }
        },
        resetMiddle: function(){
            scrollInBox.css("left", -(scrollImg.width()/2 - parseFloat(scrollOutBox.width()/2)));
        },
        prev:function(){
            if(parseFloat(scrollInBox.position().left)<-(scrollImg.width()+parseFloat(scrollOutBox.width()))){
                scrollInBox.css("left",function(){
                    return parseFloat(scrollInBox.position().left+scrollImg.width());
                })
            }
//            console.info(scrollInBox.position().left);
            scrollInBox.css("left",scrollInBox.position().left-1);
        }

    }
    module.exports = PSlides;
});


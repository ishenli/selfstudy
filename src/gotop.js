define(function(require, exports, module) {
    var jQuery=require("../sea-modules/gallery/jquery/1.7.2/jquery.js");

        var scrollToTop = function(options) {
            jQuery(function() {
                if(options.speed) {
                var speed = options.speed;
            } else {
                var speed = 1000;
                }
                if(options.ease) {
                    var ease = options.ease;
                } else {
                    var ease = "swing";
                }
                if(options.start) {
                    var start = options.start;
                } else {
                    var start = "0";
                }
                var scrollDiv = jQuery(options.element);
                scrollDiv.hide().removeAttr("href");
                if(jQuery(window).scrollTop() > start) {
                    scrollDiv.fadeIn("slow");
                }
                var FadeLock = 0;
                jQuery(window).scroll(function() {
                    if(!FadeLock) {
                        FadeLock = 1;
                        setTimeout(function() {
                            if(FadeLock) {
                                if(jQuery(window).scrollTop() > start) {
                                    jQuery(scrollDiv).fadeIn("slow");
                                } else {
                                    jQuery(scrollDiv).fadeOut("slow");
                                }
                                FadeLock = 0;
                            }
                        }, 200);
                    }
                });
                var ClickLock = 0;
                scrollDiv.click(function(event) {
                    if(!ClickLock) {
                        ClickLock = 1;
                        setTimeout(function() {
                            if(ClickLock) {
                                jQuery("html, body").animate({
                                    scrollTop: "0px"
                                }, speed, ease);
                                ClickLock = 0;
                            }
                        }, 200);
                    }
                });
            } );
        }

    module.exports =scrollToTop;

});

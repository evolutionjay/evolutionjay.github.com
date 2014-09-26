//Resize 事件优化    
var resizeTimer = null;
$(window).on('resize', function () {
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
        resizeTimer = setTimeout(function(){
            console.log("window resize");
            winMinheight($(window),100);
        }, 400);
    }
);

//Dom ready
$(function() {
    winMinheight($(window),100);
});

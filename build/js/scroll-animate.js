;(function () {
        var isScrolling = false;

        window.addEventListener("scroll", throttleScroll, false);

        function throttleScroll(e) {
            if (isScrolling == false) {
                window.requestAnimationFrame(function() {
                    scrolling(e);
                    isScrolling = false;
                });
            }
            isScrolling = true;
        }

        document.addEventListener("DOMContentLoaded", scrolling, false);

        var range_status = document.querySelector("#range_status");
        var svg = $(".city__item_rate svg");
        var elipse = $(".elipse");

        function scrolling(e) {

            if (isFullyVisible(range_status)) {
                $(range_status).animate({
                    width: "35%"
                }, 1500 );
            }


            jQuery.each(elipse,function(i,val){
                if (isFullyVisible(val)) {
                    $(val).animate({
                        height: $(val).data("height")
                    }, 3500 );
                }
            });
        }

        function isFullyVisible(el) {
            var elementBoundary = el.getBoundingClientRect();

            var top = elementBoundary.top;
            var bottom = elementBoundary.bottom;

            return ((top >= 0) && (bottom <= window.innerHeight));
        }
})();
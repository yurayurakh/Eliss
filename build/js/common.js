
var startAnimation = (function () {

    setTimeout(function () {

        alert("start");

    }, 2000);

    return {
        init: function () {
            console.log('Init startAnimation');
            startAnimation();
        }
    }
})();

var qestion = (function () {
    // Hidden Answer in the Question Block
    $('.hides-answer').hide();

    // Click by Question Item
    $('.question').click(function(){
        $(this).toggleClass('question-open').next().stop(true,true).slideToggle(300);
        return false;
    });

    return {
        init: function () {
            console.log('Init qestion');
            qestion();
        }
    }
})();

(function main() {
    $(document).ready(function () {
        qestion.init();
        startAnimation.init();
    });
})();
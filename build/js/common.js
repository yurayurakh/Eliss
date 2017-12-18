var question = (function () {

    var questionAn = function () {
        // Hidden Answer in the Question Block
        $('.hides-answer').hide();

        // Click by Question Item
        $('.question').click(function(){
            $(this).toggleClass('question-open').next().stop(true,true).slideToggle(300);
            return false;
        });
    };


    return {
        init: function () {
            console.log('Init question');
            questionAn();
        }
    }
})();


var mobileMenu = (function(){

    var sandwich = function () {
        $(".sandwich").click(function() {
            $(".sandwich").toggleClass("active");
            $(".header__nav").slideToggle();
        });
    };

    return {
        init: function () {
            sandwich();
        }
    }

})();

(function main() {
    $(document).ready(function () {
        question.init();
        mobileMenu.init();
    });
})();

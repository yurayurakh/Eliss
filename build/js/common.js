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

(function main() {
    $(document).ready(function () {
        question.init();
    });
})();

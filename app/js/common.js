
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
$(function(){
    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        color = 'rgba(255,255,255,.2)';
    canvas.width = window.innerWidth;
    canvas.height = 800;
    canvas.style.display = 'block';
    ctx.fillStyle = color;
    ctx.lineWidth = 0.1;
    ctx.strokeStyle = color;

    var mousePosition = {
        x: 10 * canvas.width / 100,
        y: 10 * canvas.height / 100
    };

    var dots = {
        nb: 50,
        distance: 150,
        d_radius: 300,
        array: []
    };

    function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype = {
        create: function(){
            ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            polygon(ctx, this.x,this.y,10,6,-Math.PI/2);
            ctx.fill();
            ctx.stroke()
        },

        animate: function(){
            for(i = 0; i < dots.nb; i++){

                var dot = dots.array[i];

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx;
                    dot.vy = - dot.vy;
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        },

        line: function(){
            for(i = 0; i < dots.nb; i++){
                for(j = 0; j < dots.nb; j++){
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                            ctx.beginPath();
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    };

    function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {
        if (sides < 3) return;
        var a = (Math.PI * 2)/sides;
        a = anticlockwise?-a:a;
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(startAngle);
        ctx.moveTo(radius,0);
        for (var i = 1; i < sides; i++) {
            ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
        }
        ctx.closePath();
        ctx.restore();
    }
    function createDots(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(i = 0; i < dots.nb; i++){
            dots.array.push(new Dot());
            dot = dots.array[i];

            dot.create();
        }

        dot.line();
        dot.animate();
    }

    $('canvas').on('mousemove mouseleave', function(e){
        if(e.type == 'mousemove'){
            mousePosition.x = e.pageX;
            mousePosition.y = e.pageY;
        }
        if(e.type == 'mouseleave'){
            mousePosition.x = canvas.width / 2;
            mousePosition.y = canvas.height / 2;
        }
    });
    setInterval(createDots, 1000/30);
});
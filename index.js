/**
 * Created by ariel on 23/07/17.
 */
var canvas;
var ctx;
var x = undefined,y;
var dx = 2,dy = -2;

function init(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    if (!x){
        x = canvas.width/2;
        y = canvas.height-30;
    }else{
        x+=dx;y+=dy;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
}
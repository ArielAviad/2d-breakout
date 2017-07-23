/**
 * Created by ariel on 23/07/17.
 */
var canvas;
var ctx;
var x,y;
var dx = 2,dy = -2;
var ballRadius = 10;

function init(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
    x = _canvas.width/2;
    y = _canvas.height-30;

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    //if ball bounce to the top or bottom of the canvas
    if (y+dy-ballRadius < 0 || y+dy+ballRadius > canvas.height)
        dy = -dy;
    //if ball bounce to the left or right of the canvas
    if (x+dx-ballRadius < 0 || x+dx+ballRadius > canvas.width)
        dx = -dx;

    x+=dx;y+=dy;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
}
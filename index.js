/**
 * Created by ariel on 23/07/17.
 */
var canvas;
var ctx;
var x,y;
var dx = 2,dy = -2;
var ballRadius = 10;
var ballColor = "#0095DD";

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];

function init(_canvas) {
    canvas = _canvas;
    ctx = _canvas.getContext("2d");
    x = _canvas.width/2;
    y = _canvas.height-30;
    paddleX =(canvas.width-paddleWidth)/2;

    document.addEventListener("keydown",keyDownHandler,false);
    document.addEventListener("keyup",keyUpHandler,false);

    for(c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0,toDraw: true };
        }
    }

}

function keyDownHandler(e) {
    if (e.keyCode == 39){
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if (e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;
    }
}


function collisionDetection() {
    for(var c=0;c<brickColumnCount;++c){
        for (var r=0;r<brickRowCount;++r){
            var b = bricks[c][r];
            if (b.toDraw && x>b.x && x<b.x+brickWidth && y>b.y && y < b.y+brickHeight){
                dy = -dy;
                b.toDraw = false;
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,
        paddleWidth,paddleHeight);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0;c<brickColumnCount;++c){
        for(var r=0;r<brickRowCount;++r){
            var b = bricks[c][r];
            if (b.toDraw) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                b.x = brickX;
                b.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = ballColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    //if ball bounce to the top of the canvas
    if (y+dy-ballRadius < 0) {
        ballColor = getRandomColor();
        dy = -dy;
    }else if (y+dy+ballRadius > canvas.height){
        if (x > paddleX && x < paddleX+paddleWidth){
            ballColor = getRandomColor();
            dy = -dy;
        }else {
            alert("Game Over");
            document.location.reload();
        }
    }
    //if ball bounce to the left or right of the canvas
    if (x+dx-ballRadius < 0 || x+dx+ballRadius > canvas.width) {
        ballColor = getRandomColor();
        dx = -dx;
    }

    if (leftPressed)
        paddleX = Math.max(paddleX-7,0);
    else if (rightPressed){
        paddleX = Math.min(paddleX+7,canvas.width-paddleWidth);
    }

    x+=dx;y+=dy;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    collisionDetection();
    drawPaddle();
    drawBall();
    drawBricks();
}

function getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;
    return ballColor;
}

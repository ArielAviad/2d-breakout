/**
 * Created by ariel on 23/07/17.
 */

function init(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();

    ctx.rect(0,0,20,20);
    ctx.fillStyle = "#ff0000";
    ctx.fill();

    ctx.closePath();

    ctx.beginPath();

    ctx.arc(50,50,20,0,Math.PI*(3/2),true);
    ctx.fillStyle = "green";
    ctx.stroke();

    ctx.closePath();

}
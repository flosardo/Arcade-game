var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 7;
var ballSpeedY = 3;
var paddle1Y = 250;
var paddle2Y = 250;
var player1Score = 0;
var player2Score = 0;
var showWinningScreen = false;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10
const WINNING_SCORE = 5

function calculateMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    }
}

function mouseClick(event) {
    if(showWinningScreen){
        player1Score = 0
        player2Score = 0
        showWinningScreen = false
    }
}

window.onload = function(){
    canvas = document.getElementById("gameCanvas")
    canvasContext = canvas.getContext("2d")
    var framesPerSecond = 50;
	setInterval(function() {
			moveEverything();
			drawEverything();	
        }, 1000/framesPerSecond);

        canvas.addEventListener("mousedown", mouseClick)
        
        canvas.addEventListener("mousemove",
        function (event) {
            var mousePos = calculateMousePosition(event)
            paddle1Y = mousePos.y - (PADDLE_HEIGHT/2)        
        })
}

function ballReset() {
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){

        showWinningScreen = true
    }

    ballY = canvas.height/2 
    ballX = canvas.width/2
}

function computerMovements() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
    if (paddle2YCenter < ballY -35){
        paddle2Y += 6
    }
    else if(paddle2YCenter < ballY + 35){
        paddle2Y -= 6
    }
}

function moveEverything() {
    if (showWinningScreen){
        return
    }
    computerMovements()
    ballX +=  ballSpeedX;
    ballY += ballSpeedY

	if(ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35
        }
        else{
            player2Score ++
            ballReset()
        }
    }
    if(ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2)
            ballSpeedY = deltaY * 0.35

        }
        else{
            player1Score ++
            ballReset()

        }
    }
    if(ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

function  drawNet() {
    for(var i=0; i < canvas.height; i+=40){
        colorRect(canvas.width/2-1,i, 2, 20, "white")
    }
}

function drawEverything() {
	// next line blanks out the screen with black
    colorRect(0,0,canvas.width,canvas.height,'black');
    
	if(showWinningScreen) {
		canvasContext.fillStyle = 'white';

		if(player1Score >= WINNING_SCORE) {
			canvasContext.fillText("Left Player Won", 350, 200);
		} else if(player2Score >= WINNING_SCORE) {
			canvasContext.fillText("Right Player Won", 350, 200);
		}

		canvasContext.fillText("Click to play again", 350, 500);
		return;
    }
    drawNet()
	// this is left player paddle
	colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	// this is right computer paddle
	colorRect(canvas.width - PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	// next line draws the ball
    colorCircle(ballX, ballY, 10, "white")
    canvasContext.fillText(player1Score, 100, 100)
    canvasContext.fillText(player2Score, canvas.width-100, 100)
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill()

}

function colorRect(leftX,topY, width,height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX,topY, width,height);
}
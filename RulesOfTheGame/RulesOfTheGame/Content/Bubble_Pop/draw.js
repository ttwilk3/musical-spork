var bubbles = [];
var score = 0;
var highScore = 0;
var lives = 3;
var canvas;
var bg;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('sketch-holder');
    scoreP = createP("Score: " + score);
    scoreP.parent('sketch-holder');
    hscoreP = createP("High score: " + highScore);
    hscoreP.parent('sketch-holder');
    bg = loadImage(root + "Content/Bubble_Pop/bg.jpg")
	for(i = 0; i < 10; i++) {
		var x = random(width);
		//var y = random(height);
		bubbles.push(new Bubble(x, random(500,700)));
	}

}

function mousePressed() {
	for(var i = 0; i < bubbles.length; i++){
		bubbles[i].clickingBubble();
	}
}


function draw () {
    background(bg);
    checkHighScore();
    displayScore();
	for (var i = 0; i < bubbles.length; i++){
		bubbles[i].move();
		bubbles[i].display();
	}

}

function endGame(){
    if (lives <= 0) {
        noLoop();
        canvas.remove();
        var gameOver = createP("GAME OVER");
        gameOver.parent('sketch-holder');
        $('#sketch-holder').append('<button class="btn btn-primary" onClick=\'tryAgain()\'>Try Again?</button>');

        newScore(score, "Bubble Pop");
    }
}

function tryAgain() {
    location.reload();
}

function checkHighScore() {
    if (score > highScore)
        highScore = score;
}

function displayScore() {
    removeElements();
    scoreP = createP("Score: " + floor(score));
    scoreP.parent('sketch-holder');
    hscoreP = createP("High score: " + floor(highScore));
    hscoreP.parent('sketch-holder');
}

function checkScore(){

}


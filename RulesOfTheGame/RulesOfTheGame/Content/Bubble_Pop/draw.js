


var bubbles = [];
var score = 0;
var scoreX = 0;
var scoreY = 0;
var lives = 3;


function setup(){
	createCanvas(800,800);
	for(i = 0; i < 10; i++) {
		var x = random(width);
		//var y = random(height);
		bubbles.push(new Bubble(x, random(800,1100)));
	}

}

function mousePressed() {
	for(var i = 0; i < bubbles.length; i++){
		bubbles[i].clickingBubble();
	}
}


function draw () {
	background(0);
	$("#score").text("Score: " + score);

	for (var i = 0; i < bubbles.length; i++){
		bubbles[i].move();
		bubbles[i].display();
	}

}

function drawScore(){
	score.display();
}

function endGame(){
	if(lives <= 0){
		alert("Game Over");
		location.reload();
		//checkScore();
	}
}

function checkScore(){

}











function Bubble(x,y) {
	this.x = x;
	this.y = y;
	var speed = -0.5;
	this.bub = loadImage(root + "Content/Bubble_Pop/bubble.png");

	this.display = function() {
	    stroke(255);
	    image(this.bub, this.x, this.y, 60, 60);
	}

	this.move = function() {
		this.x = this.x + random(-2,2);
		this.y = this.y + random(-1) + speed;
		if(this.x <= 0)
			this.x = this.x + 3
		else if(this.x >= 450)
			this.x = this.x - 3;
		if(this.y <= -60){
			lives = lives - 1;
			this.x = random(0, 450);
			this.y = random(500, 600);
			this.checkLives();
		}
	}


	this.clickingBubble = function() {
		var dc = dist(mouseX, mouseY, this.x+30, this.y+30);
		if (dc < 30){
			this.x = random(0, 450);
			this.y = random(500, 600);
			speed += -0.25;
			score ++;
		}
	}

	this.checkLives = function(){
		if(lives <= 0){
			endGame();
		}
	}
}
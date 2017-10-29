


function Bubble(x,y) {
	this.x = x;
	this.y = y;
	this.col = color(255,100);
	var speed = -0.5;
	var red = 0;
	var blue = 0;
	var green = 0;

	this.display = function() {
		stroke(255);
		fill(this.col);
		ellipse(this.x, this.y, 60, 60);
	}

	this.move = function() {
		this.x = this.x + random(-2,2);
		this.y = this.y + random(-1) + speed;
		if(this.x <= 0)
			this.x = this.x + 3
		else if(this.x >= 800)
			this.x = this.x - 3;
		if(this.y <= 0){
			lives = lives - 1;
			this.x = random(0, 800);
			this.y = random(800, 900);
			this.checkLives();
		}
	}


	this.clickingBubble = function() {
		var dc = dist(mouseX, mouseY, this.x, this.y);
		if (dc < 30){
			//this.col = color(255, 0, 200);
			if(red < 255)
				red += 5;
			if (red == 255 && blue != 255)
				blue += 5;
			if (blue == 255 && green < 255)
				green += 5;
			this.col = color(red, green, blue);
			this.x = random(0, 800);
			this.y = random(800, 900);
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

    var bird;
    var pipes = [];
    var score = 0;
    var highScore = 0;
    var scoreP;
    var hscoreP;
    var canvas;
    var bg;
    var ground;
    var isGameOver;

    function preload() {
        bg = loadImage(root + "Content/Flappy_Bird/bg.png");
        ground = loadImage(root + "Content/Flappy_Bird/ground.png");
    }

    function setup() {
        canvas = createCanvas(288, 384);
        canvas.parent('sketch-holder');
        scoreP = createP("Score: " + score);
        scoreP.parent('sketch-holder');
        //hscoreP = createP("High score: " + highScore);
        //hscoreP.parent('sketch-holder');
        bird = new Bird();
        pipes.push(new Pipe());
    }

    function draw() {
        background(bg);
        //background(51);

        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].show();
            pipes[i].update();

            /*if (pipes[i].hits(bird)) {
              score -= 50;
            } else {
              score += 0.5;
            }*/
            if (pipes[i].hits(bird)) {
                isGameOver = true;
            } else {
                score += 0.01;
            }

            if (pipes[i].offScreen()) {
                pipes.splice(i, 1);
            }
        }

        bird.show();
        bird.update();

        image(ground, 0, height - 40);

        if (frameCount % 100 == 0) {
            pipes.push(new Pipe());
        }
        //score++;
        //if (score > highScore) {
        //    highScore = score;
        //}
        removeElements();
        scoreP = createP("Score: " + floor(score));
        scoreP.parent('sketch-holder');
        //hscoreP = createP("High score: " + floor(highScore));
        //hscoreP.parent('sketch-holder');

        //if (score < -1000) {
        if (isGameOver == true) {
            noLoop();
            canvas.remove();
            var gameOver = createP("GAME OVER");
            gameOver.parent('sketch-holder');

            //tryAgainButton = createButton('TRY AGAIN?');
            //tryAgainButton.mousePressed(tryAgain);
            //tryAgainButton.parent('sketch-holder');
            $('#sketch-holder').append('<button class="btn btn-primary" onClick=\'tryAgain()\'>Try Again?</button>');
            newScore(score, "Flappy Bird");
        }
    }

    function tryAgain() {
        location.reload();
    }

    function keyPressed() {
        if (key == ' ') {
            bird.up();
        }
    }

    function Bird() {
        this.brd = loadImage(root + "Content/Flappy_Bird/bird.png");
        
        this.y = height / 2;
        this.x = 64;

        this.gravity = 0.85; //0.65;
        this.lift = -25; //-15
        this.vel = 0;

        this.show = function () {
            //fill(255, 255, 0);
            //ellipse(this.x, this.y, 32, 32);
            image(this.brd, this.x, this.y);
        }

        this.up = function () {
            this.vel += this.lift;
            //this.vel += -this.gravity * 10;
        }

        this.update = function () {
            this.vel += this.gravity;
            this.vel *= 0.9;
            this.y += this.vel;

            if (this.y > height - 40) {
                isGameOver = true;
            }

            if (this.y > height) {
                this.y = height;
                this.velocity = 0;
            }

            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        }

    }

    function Pipe() {
        
        this.downPipe = loadImage(root + "Content/Flappy_Bird/tube1.png");
        this.upPipe = loadImage(root + "Content/Flappy_Bird/tube2.png");
        this.rand = random(-150, 150);
        

        this.top = 100 + this.rand; //random(height / 2);
        this.bottom = 100 - this.rand; //random(height / 2);
        this.x = canvas.width;
        this.w = 52;
        this.speed = 3;
        this.highlight = false;

        this.show = function () {
            fill(255);
            if (this.highlight) {
                fill(255, 0, 0);
            }
            //rect(this.x, 0, this.w, this.top);
            image(this.downPipe, this.x, 0, this.downPipe.width, this.top);
            //rect(this.x, height - this.bottom, this.w, this.bottom);
            image(this.upPipe, this.x, canvas.height - this.bottom - 40, this.upPipe.width, this.bottom);
        }

        this.hits = function (bird) {
            if (bird.y < this.top || bird.y > canvas.height - this.bottom) {
                if (bird.x > this.x && bird.x < this.x + this.w) {
                    this.highlight = true;
                    return true;
                }
            } else {
                this.highlight = false;
                return false;
            }
        }

        this.offScreen = function () {
            if (this.x < -this.w) {
                return true;
            } else {
                return false;
            }
        }

        this.update = function () {
            this.x -= this.speed;
        }

    }

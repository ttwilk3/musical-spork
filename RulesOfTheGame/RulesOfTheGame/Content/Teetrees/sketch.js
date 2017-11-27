var shapes  =[];
var square;
var board;
var canvas;
var current;
var gameOver = 0;
var level =50;
var move=level-1;
var speed =10;
var frame =60;
var score = 0;
var highScore = 0;
var scoreP;
var hscoreP;
var bg;

function preload() {
    bg = loadImage(root + "Content/Teetrees/bgImage.png")
    
}

function setup() {
  setFrameRate(frame);
  canvas = createCanvas(300, 300);
  canvas.parent('sketch-holder');
  board = new Board();
  current = new ranShape();
  score = createP("Score : " + score);
  score.parent('sketch-holder');
  //hscoreP = createP("High Score: " + highScore);
  //hscoreP.parent('sketch-holder');
  
 
  
}

function draw() {
    background(bg);
    board.display();
    current.display();
    
    

    move++;
    if (move == level && !gameOver) {
        current.settled = collisionFall();
        if (current.settled) {
            board.addToBoard(current);
            board.checkLines();
            score.html("Score : " + board.updateScore());
            checkHighScore();
            current = ranShape();
            current.settled = collisionFall();

           

           
            if (current.settled) {
                gameOver = 1;
                noLoop();
                canvas.remove()
                var GOver = createP("GAME OVER");
                GOver.parent('sketch-holder');

                $('#sketch-holder').append('<button class="btn btn-primary" onClick=\'tryAgain()\'>Try Again?</button>')
                newScore(score, "TeeTrees");
            }
        }
        current.fall();
        move = 0;
    }

}


function checkHighScore() {
    if (score > highScore)
        highScore = score;
}

function tryAgain() {
    location.reload();
}

collisionFall = function() {
  if(current.bottom > 200) return 1;
  for(var i=0; i<current.squares.length; i++){
    if(board.present[((current.squares[i].xpos-100)/10)][(current.squares[i].ypos/10)]){
      return 1;
    }
  }
  return 0;
}

collisionRight = function() {
  for(var i=0; i<current.squares.length; i++){
    if(current.squares[i].xpos==190) return 1;
    if(board.present[((current.squares[i].xpos-100)/10)+1][(current.squares[i].ypos/10)-1]){
      return 1;
    }
  }
  return 0;
}

collisionLeft = function() {
  for(var i=0; i<current.squares.length; i++){
    if(current.squares[i].xpos==100) return 1;
    if(board.present[((current.squares[i].xpos-100)/10)-1][(current.squares[i].ypos/10)-1]){
      return 1;
    }
  }
  return 0;
}


function keyPressed() {
    if ((key == ' ' || keyCode == UP_ARROW) && !current.settled) {
    current.rotateClock();
  } else if (keyCode == RIGHT_ARROW && !collisionRight() && !current.settled){
    current.moveRight();
  } else if (keyCode == LEFT_ARROW && !collisionLeft()  && !current.settled){
    current.moveLeft();
  } else if(keyCode == DOWN_ARROW){
    level = 3;
    move=2;
  }
}

function keyReleased() {
  if(keyCode == DOWN_ARROW){
    level =20;
    move=9;
  }
}

function ranShape() {
  var r = Math.floor(random(6.999));
  switch(r) {
    case 0:
    return new TShape(board.xpos, board.ypos, speed);
    case 1:
    return new LineShape(board.xpos, board.ypos, speed);
    case 2:
    return new ZShape(board.xpos, board.ypos, speed);
    case 3:
    return new BoxShape(board.xpos, board.ypos, speed);
    case 4:
    return new LShape(board.xpos, board.ypos, speed);
    case 5:
    return new SShape(board.xpos, board.ypos, speed);
    case 6:
    return new LOpShape(board.xpos, board.ypos, speed);
  }
}

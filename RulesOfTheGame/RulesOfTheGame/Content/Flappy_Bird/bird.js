window.onload = function Bird() {
  function preload() {
      this.brd = loadImage(root + "Content/Flappy_Bird/bird.png");
  }
  this.y = height / 2;
  this.x = 64;

  this.gravity = 0.85; //0.65;
  this.lift = -32; //-15
  this.vel = 0;

  this.show = function() {
    //fill(255, 255, 0);
    //ellipse(this.x, this.y, 32, 32);
    image(this.brd, this.x, this.y);
  }

  this.up = function() {
    this.vel += this.lift;
    //this.vel += -this.gravity * 10;
  }

  this.update = function() {
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

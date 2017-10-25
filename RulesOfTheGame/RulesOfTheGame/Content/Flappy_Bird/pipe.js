window.onload = function Pipe() {
  function preload() {
      this.downPipe = loadImage(root + "Content/Flappy_Bird/tube1.png");
      this.upPipe = loadImage(root + "Content/Flappy_Bird/tube2.png");
      this.rand = random(-150, 150);
  }

  this.top = 100 + this.rand; //random(height / 2);
  this.bottom = 100 - this.rand; //random(height / 2);
  this.x = canvas.width;
  this.w = 52;
  this.speed = 3;
  this.highlight = false;

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    //rect(this.x, 0, this.w, this.top);
    image(this.downPipe, this.x, 0, this.downPipe.width, this.top);
    //rect(this.x, height - this.bottom, this.w, this.bottom);
    image(this.upPipe, this.x, canvas.height - this.bottom - 40, this.upPipe.width, this.bottom);
  }

  this.hits = function(bird) {
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

  this.offScreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    this.x -= this.speed;
  }

}

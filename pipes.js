function Pipe() {

  this.gap = 150;
  this.w = 75;
  this.x = width;
  this.speed = 4;
  this.h1 = random(height / 2);
  this.h2 = this.h1 + this.gap;
  this.checkCollision = false;

  this.show = function() {
    if (this.checkCollision) {
      fill(255, 0, 0);
    } else {
      fill(255);
    }
    rect(this.x, 0, this.w, this.h1);
    rect(this.x, this.h2, this.w, height);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    return this.x < -this.w;
  }

  this.pass = function(bird) {
    if (bird.x > this.x && !this.passed) {
      this.passed = true;
      return true;
    }
    return false;
  }

  this.hits = function(bird) {
    let halfBirdHeight = bird.r / 2;
    if (bird.y - halfBirdHeight < this.h1 || bird.y + halfBirdHeight > this.h2) {
      if (bird.x + halfBirdHeight > this.x - this.w && bird.x - halfBirdHeight < this.x + this.w) {
        this.passed = true;
        this.checkCollision = true;
        return true;
      }
    }
    this.checkCollision = false;
    return false;
  }

}

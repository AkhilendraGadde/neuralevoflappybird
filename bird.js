function Bird(brain) {

  this.x = 60;
  this.y = height / 2;
  this.gravity = 0.8;
  this.velocity = 0;
  this.uplift = -12;
  this.r = 16;
  this.score = 0;
  this.fitness = 0;

  if (brain) {
    this.brain = brain.copy();
    //this.brain.mutate(mutate);
  } else {
    this.brain = new NeuralNetwork(5, 16, 2);
  }

  this.mutation = function() {
    this.brain.mutate(mutate);
  }

  mutate = function(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }
  // this.copy = function() {
  //   return new Bird();
  // }

  this.think = function(pipes) {

    let closest = null;
    let record = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let diff = (pipes[i].x + pipes[i].w) - this.x;
      if (diff > 0 && diff < record) {
        record = diff;
        closest = pipes[i];
      }
    }

    if (closest != null) {
      let inputs = [];
      inputs[0] = map(closest.x, this.x, width, 0, 1);
      inputs[1] = map(closest.h1, 0, height, 0, 1);
      inputs[2] = map(closest.h2, 0, height, 0, 1);
      inputs[3] = map(this.y, 0, height, 0, 1);
      inputs[4] = map(this.velocity, -5, 5, 0, 1);
      //inputs[4] = 0; //this.velocity / 10;

      let action = this.brain.predict(inputs);
      if (action[1] > action[0] && this.velocity >= 0) {
        this.up();
      }
    }
  }

  this.show = function() {
    stroke(255)
    fill(255, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  this.offscreen = function() {
    return (this.y > height || this.y < 0);
  }

  this.update = function() {
    this.score++;

    this.velocity += this.gravity;
    this.y += this.velocity;
    /*if (this.y > height) {
      this.y = height;
      this.velocity = 0;

    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;

    }*/

  }

  this.up = function() {
    this.velocity += this.uplift;
  }

}

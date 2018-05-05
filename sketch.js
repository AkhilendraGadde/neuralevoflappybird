let birds = [];
let saved_birds = [];
let pipes = [];
const TOTAL = 500;
let counter = 0;
let slider = 0
let best_bird_data;
let reset = true;
let mBird;

function keyPressed() {

  if (key == ' ') {

    if (birds.length === 1) {
      console.log('SAVE BEST BIRD');
      let best_bird = birds[0];
      best_bird_data = best_bird.brain.serialize();
      //saveJSON(best_bird_data, 'best_bird.json');
      //best_bird_data = json;
      //console.log(json);
    } else {
      console.log('[Training in progress !]');
    }

  }

  if (key == 'B') {
    console.log('BEST BIRD');
    let bird_obj = NeuralNetwork.deserialize(best_bird_data);
    mBird = new Bird(bird_obj);
    reset = false;
  }

  if (key == 'R') {
    console.log('RESET');
    resetGame();
  }
}

function resetGame() {
  reset = true;
  for (let i = 0; i < TOTAL; i++)
    birds[i] = new Bird();
  counter = 0;
  pipes = []
}

function setup() {
  createCanvas(480, 640);
  slider = createSlider(1, 10, 1);
  for (let i = 0; i < TOTAL; i++)
    birds[i] = new Bird();
}

function draw() {

  for (let n = 0; n < slider.value(); n++) {

    if (reset) {

      if (counter % 75 == 0) {
        pipes.push(new Pipe());
      }
      counter++;
      for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        for (let j = birds.length - 1; j >= 0; j--) {
          if (birds[j].x >= pipes[i].x) {
            if (pipes[i].hits(birds[j])) {
              saved_birds.push(birds.splice(j, 1)[0]);
            }
          }
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }

      for (let bird of birds) {
        bird.think(pipes);
        bird.update();
      }

      if (birds.length === 0) {
        counter = 0;
        nextGeneration();
        pipes = [];
      }
    } else {

      if (counter % 75 == 0) {
        pipes.push(new Pipe());
      }
      counter++;
      for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (mBird.x >= pipes[i].x) {
          if (pipes[i].hits(mBird)) {
            resetGame();
          }
        }
        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
      }
      mBird.think(pipes);
      mBird.update();
    }

  }

  if (reset) {
    for (let i = birds.length - 1; i >= 0; i--) {
      if (birds[i].offscreen()) {
        saved_birds.push(birds.splice(i, 1)[0]);
      }
    }

    background(0);
    for (bird of birds) {
      bird.show();
    }
    for (pipe of pipes) {
      pipe.show();
    }

  } else {

    background(0);
    mBird.show();
    for (pipe of pipes) {
      pipe.show();
    }
  }
}

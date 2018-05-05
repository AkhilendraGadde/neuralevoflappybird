let birds = [];
let saved_birds = [];
let pipes = [];
const TOTAL = 500;
let counter = 0;
let slider = 0
let best_bird_data;
let reset = true;
let mBird;
let score = 0;
let maxScore = 0;

function showScores() {
  textSize(32);
  fill(255, 150, 255);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function keyPressed() {

  if (key == ' ') {

    if (birds.length <= 3) {
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
    if (best_bird_data) {
      console.log('BEST BIRD');
      let bird_obj = NeuralNetwork.deserialize(best_bird_data);
      mBird = new Bird(bird_obj);
      reset = false;
      score = 0;
    } else {
      console.log('[Training in progress !]');
    }
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

          if (pipes[i].pass(birds[j])) {
            score++;
          }
          if (birds[j].x >= pipes[i].x) {
            if (pipes[i].hits(birds[j])) {
              saved_birds.push(birds.splice(j, 1)[0]);

              maxScore = max(score, maxScore);
              score = 0;
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

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1)
        }
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].pass(mBird)) {
          score++;
        }
        if (mBird.x >= pipes[i].x) {
          if (pipes[i].hits(mBird)) {
            maxScore = max(score, maxScore);
            score = 0;
            resetGame();
          }
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
  showScores();
}

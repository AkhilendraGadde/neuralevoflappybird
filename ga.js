function nextGeneration() {
  console.log("NEXT GENERATION");
  fitnessF();
  for (let i = 0; i < TOTAL; i++) {
    birds[i] = pickOne();
  }
  saved_birds = [];
}

function pickOne() {

  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= saved_birds[index].fitness;
    index += 1;
  }
  index -= 1;
  let bird = saved_birds[index];
  let child = new Bird(bird.brain);
  child.mutation();
  return child;
}

function fitnessF() {
  let sum = 0;
  for (let bird of saved_birds) {
    sum += bird.score;
  }
  for (let bird of saved_birds) {
    bird.fitness = bird.score / sum;
  }
}

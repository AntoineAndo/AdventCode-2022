const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  const inputSplit = input.split("\n").filter((l) => l != "");
  const MAP_WIDTH = inputSplit[0].length;
  const MAP_LENGTH = inputSplit.length;

  let best = 0;

  //For each tree
  for (y = 0; y < MAP_LENGTH; y++) {
    for (x = 0; x < MAP_WIDTH; x++) {
      scoreUp = getScoreUp(inputSplit, x, y);
      scoreDown = getScoreDown(inputSplit, x, y);
      scoreLeft = getScoreLeft(inputSplit, x, y);
      scoreRight = getScoreRight(inputSplit, x, y);

      let totalTree = scoreUp * scoreDown * scoreLeft * scoreRight;
      if (totalTree > best) {
        best = totalTree;
      }
    }
  }
});

const getScoreUp = (input, x, y) => {
  let yy = y;
  let score = 0;
  while (yy > 0) {
    yy--;
    if (input[yy][x] >= input[y][x]) {
      score++;
      break;
    }
    score++;
  }

  return score;
};

const getScoreDown = (input, x, y) => {
  let yy = y;
  let score = 0;
  while (yy < input.length - 1) {
    yy++;
    if (input[yy][x] >= input[y][x]) {
      score++;
      break;
    }
    score++;
  }

  return score;
};

const getScoreLeft = (input, x, y) => {
  let xx = x;
  let score = 0;
  while (xx > 0) {
    xx--;
    if (input[y][xx] >= input[y][x]) {
      score++;
      break;
    }
    score++;
  }

  return score;
};

const getScoreRight = (input, x, y) => {
  let xx = x;
  let score = 0;
  while (xx < input[0].length - 1) {
    xx++;
    if (input[y][xx] >= input[y][x]) {
      score++;
      break;
    }
    score++;
  }

  return score;
};

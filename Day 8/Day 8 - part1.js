const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  const inputSplit = input.split("\n").filter((l) => l != "");
  const MAP_WIDTH = inputSplit[0].length;
  const MAP_LENGTH = inputSplit.length;

  let total = 0;

  //For each tree
  for (y = 0; y < MAP_LENGTH; y++) {
    for (x = 0; x < MAP_WIDTH; x++) {
      if (
        topLookup(inputSplit, x, y) ||
        bottomLookup(inputSplit, x, y) ||
        leftLookup(inputSplit, x, y) ||
        rightLookup(inputSplit, x, y)
      ) {
        total++;
      }
    }
  }

  console.log(total);
});

const leftLookup = (inputSplit, x, y) => {
  let r = inputSplit[y]
    .substr(0, x)
    .split("")
    .filter((t) => t >= inputSplit[y][x]);
  if (r == undefined || r.length == 0) {
    return true;
  }
  return false;
};

const rightLookup = (inputSplit, x, y) => {
  let r = inputSplit[y]
    .substr(x + 1)
    .split("")
    .filter((t) => t >= inputSplit[y][x]);

  if (r.length == 0) {
    return true;
  }
  return false;
};

const topLookup = (inputSplit, x, y) => {
  for (yy = y - 1; yy >= 0; yy--) {
    if (inputSplit[yy][x] >= inputSplit[y][x]) {
      return false;
    }
  }
  return true;
};

const bottomLookup = (inputSplit, x, y) => {
  for (yy = y + 1; yy < inputSplit.length; yy++) {
    if (inputSplit[yy][x] >= inputSplit[y][x]) {
      return false;
    }
  }
  return true;
};

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  //   input = `R 5
  // U 8
  // L 8
  // D 3
  // R 17
  // D 10
  // L 25
  // U 20`;

  const origin = {
    x: 11,
    y: 5,
  };

  const tailP = [];

  let rope = {
    h: {
      x: origin.x,
      y: origin.y,
    },
    1: {
      x: origin.x,
      y: origin.y,
    },
    2: {
      x: origin.x,
      y: origin.y,
    },
    3: {
      x: origin.x,
      y: origin.y,
    },
    4: {
      x: origin.x,
      y: origin.y,
    },
    5: {
      x: origin.x,
      y: origin.y,
    },
    6: {
      x: origin.x,
      y: origin.y,
    },
    7: {
      x: origin.x,
      y: origin.y,
    },
    8: {
      x: origin.x,
      y: origin.y,
    },
    9: {
      x: origin.x,
      y: origin.y,
    },
  };

  input.split("\n").forEach((command) => {});
});

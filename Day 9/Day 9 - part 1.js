const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  //   input = `R 4
  // U 4
  // L 3
  // D 1
  // R 4
  // D 1
  // L 5
  // R 2`;

  let h = {
    x: 0,
    y: 0,
  };

  let t = {
    x: 0,
    y: 0,
  };

  let tailP = [];

  input.split("\n").forEach((command) => {
    //action
    const direction = command.split(" ")[0];
    const distance = parseInt(command.split(" ")[1]);

    for (let d = 0; d < distance; d++) {
      switch (direction) {
        case "U":
          h.y++;
          break;
        case "D":
          h.y--;
          break;
        case "L":
          h.x--;
          break;
        case "R":
          h.x++;
          break;
      }
      //impact
      let nextTX = t.x;
      let nextTY = t.y;
      if (h.x - t.x == 2 || (h.x - t.x == 1 && Math.abs(h.y - t.y) == 2)) {
        nextTX++;
      } else if (
        h.x - t.x == -2 ||
        (h.x - t.x == -1 && Math.abs(h.y - t.y) == 2)
      ) {
        nextTX--;
      }

      if (h.y - t.y == 2 || (h.y - t.y == 1 && Math.abs(h.x - t.x) == 2)) {
        nextTY++;
      } else if (
        h.y - t.y == -2 ||
        (h.y - t.y == -1 && Math.abs(h.x - t.x) == 2)
      ) {
        nextTY--;
      }

      t.x = nextTX;
      t.y = nextTY;

      if (tailP.find((p) => p.x == t.x && p.y == t.y) == undefined) {
        tailP.push({ x: t.x, y: t.y });
      }
    }
  });
  console.log(tailP);
  console.log(tailP.length);
});

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

  input.split("\n").forEach((command) => {
    //action
    const direction = command.split(" ")[0];
    const distance = parseInt(command.split(" ")[1]);

    for (let d = 0; d < distance; d++) {
      switch (direction) {
        case "U":
          rope.h.y++;
          break;
        case "D":
          rope.h.y--;
          break;
        case "L":
          rope.h.x--;
          break;
        case "R":
          rope.h.x++;
          break;
      }

      const tail = Object.keys(rope).sort();
      tail.unshift(tail.pop());

      for (t = 1; t < tail.length; t++) {
        //impact
        let nextTX = rope[tail[t]].x;
        let nextTY = rope[tail[t]].y;
        if (
          rope[tail[t - 1]].x - rope[tail[t]].x == 2 ||
          (rope[tail[t - 1]].x - rope[tail[t]].x == 1 &&
            Math.abs(rope[tail[t - 1]].y - rope[tail[t]].y) == 2)
        ) {
          nextTX++;
        } else if (
          rope[tail[t - 1]].x - rope[tail[t]].x == -2 ||
          (rope[tail[t - 1]].x - rope[tail[t]].x == -1 &&
            Math.abs(rope[tail[t - 1]].y - rope[tail[t]].y) == 2)
        ) {
          nextTX--;
        }

        if (
          rope[tail[t - 1]].y - rope[tail[t]].y == 2 ||
          (rope[tail[t - 1]].y - rope[tail[t]].y == 1 &&
            Math.abs(rope[tail[t - 1]].x - rope[tail[t]].x) == 2)
        ) {
          nextTY++;
        } else if (
          rope[tail[t - 1]].y - rope[tail[t]].y == -2 ||
          (rope[tail[t - 1]].y - rope[tail[t]].y == -1 &&
            Math.abs(rope[tail[t - 1]].x - rope[tail[t]].x) == 2)
        ) {
          nextTY--;
        }
        rope[tail[t]].x = nextTX;
        rope[tail[t]].y = nextTY;
      }
      if (
        tailP.find(
          (p) =>
            p.x == rope[tail.length - 1].x && p.y == rope[tail.length - 1].y
        ) == undefined
      ) {
        tailP.push({
          x: rope[tail.length - 1].x,
          y: rope[tail.length - 1].y,
        });
      }
    }
  });

  console.log(tailP);
  console.log(tailP.length);
});

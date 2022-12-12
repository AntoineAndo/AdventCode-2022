const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  let x = 1;
  const sprite_width = 3;
  const t = Math.floor(sprite_width / 2);

  let c = 0;

  console.clear();

  input
    .split("\n")
    .filter((v) => v != "")
    .forEach((command) => {
      let instr = command.split(" ");
      let taskLength;

      if (instr[0] == "noop") {
        taskLength = 0;
      } else if (instr[0] == "addx") {
        taskLength = 1;
      }

      //update all in queue
      for (let i = taskLength; i >= 0; i--) {
        c++;

        display(c, x);

        if (i == 0 && instr[0] == "addx") {
          x += parseInt(instr[1]);
        }
      }
    });
});

const display = (c, x) => {
  if ((c - 1) % 40 >= x - 1 && (c - 1) % 40 <= x + 1) {
    process.stdout.write("#");
  } else {
    process.stdout.write(".");
  }
  if (c % 40 == 0) {
    process.stdout.write("\n");
  }
};

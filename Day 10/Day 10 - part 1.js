const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  //   input = `addx 15
  // addx -11
  // addx 6
  // addx -3
  // addx 5
  // addx -1
  // addx -8
  // addx 13
  // addx 4
  // noop
  // addx -1
  // addx 5
  // addx -1
  // addx 5
  // addx -1
  // addx 5
  // addx -1
  // addx 5
  // addx -1
  // addx -35
  // addx 1
  // addx 24
  // addx -19
  // addx 1
  // addx 16
  // addx -11
  // noop
  // noop
  // addx 21
  // addx -15
  // noop
  // noop
  // addx -3
  // addx 9
  // addx 1
  // addx -3
  // addx 8
  // addx 1
  // addx 5
  // noop
  // noop
  // noop
  // noop
  // noop
  // addx -36
  // noop
  // addx 1
  // addx 7
  // noop
  // noop
  // noop
  // addx 2
  // addx 6
  // noop
  // noop
  // noop
  // noop
  // noop
  // addx 1
  // noop
  // noop
  // addx 7
  // addx 1
  // noop
  // addx -13
  // addx 13
  // addx 7
  // noop
  // addx 1
  // addx -33
  // noop
  // noop
  // noop
  // addx 2
  // noop
  // noop
  // noop
  // addx 8
  // noop
  // addx -1
  // addx 2
  // addx 1
  // noop
  // addx 17
  // addx -9
  // addx 1
  // addx 1
  // addx -3
  // addx 11
  // noop
  // noop
  // addx 1
  // noop
  // addx 1
  // noop
  // noop
  // addx -13
  // addx -19
  // addx 1
  // addx 3
  // addx 26
  // addx -30
  // addx 12
  // addx -1
  // addx 3
  // addx 1
  // noop
  // noop
  // noop
  // addx -9
  // addx 18
  // addx 1
  // addx 2
  // noop
  // noop
  // addx 9
  // noop
  // noop
  // noop
  // addx -1
  // addx 2
  // addx -37
  // addx 1
  // addx 3
  // noop
  // addx 15
  // addx -21
  // addx 22
  // addx -6
  // addx 1
  // noop
  // addx 2
  // addx 1
  // noop
  // addx -10
  // noop
  // noop
  // addx 20
  // addx 1
  // addx 2
  // addx 2
  // addx -6
  // addx -11
  // noop
  // noop
  // noop`;

  let x = 1;
  let total = 0;
  let milestones = [20, 60, 100, 140, 180, 220];

  let c = 0;

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
        //calculate signal strength
        if (c == milestones[0]) {
          total += c * x;
          milestones.shift();
        }
        if (i == 0 && instr[0] == "addx") {
          x += parseInt(instr[1]);
        }
      }
    });

  console.log("total", total);

  // //remove completed items
  // queue = queue.filter((i) => i.expiresIn > 0);

  // //calculate signal strength
  // if (j == milestones[0] - 1) {
  //   console.log("---milestone----");
  //   console.log(j, x);
  //   total += milestones[0] * x;
  //   console.log(total);
  //   milestones.shift();
  // }
});

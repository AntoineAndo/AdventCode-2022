const fs = require("fs");

const stacks = [
  ["H", "T", "Z", "D"],
  ["Q", "R", "W", "T", "G", "C", "S"],
  ["P", "B", "F", "Q", "N", "R", "C", "H"],
  ["L", "C", "N", "F", "H", "Z"],
  ["G", "L", "F", "Q", "S"],
  ["V", "P", "W", "Z", "B", "R", "C", "S"],
  ["Z", "F", "J"],
  ["D", "L", "V", "Z", "R", "H", "Q"],
  ["B", "H", "G", "N", "F", "Z", "L", "D"],
];

// const stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  //   input = `move 1 from 2 to 1
  // move 3 from 1 to 3
  // move 2 from 2 to 1
  // move 1 from 1 to 2`;

  input
    .split("\n\n")[1]
    .split("\n")
    .filter((instr) => instr != "")
    .map((string) => {
      return string.match(/\s(\d+)/g);
    })
    .forEach((instr) => {
      const amount = instr[0];

      stacks[instr[2] - 1].push(
        ...stacks[instr[1] - 1].splice(
          stacks[instr[1] - 1].length - amount,
          amount
        )
      );
    });

  const result = stacks.reduce(
    (result, stack) => result.concat(stack.pop()),
    ""
  );

  console.log(result);
});

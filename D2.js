const fs = require("fs");

fs.readFile("./D2.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const X = 1; //rock
  const Y = 2; //paper
  const Z = 3; //scissor

  const A = 1;
  const B = 2;
  const C = 3;

  let r = input.split("\n").reduce((total, turn) => {
    const play = turn.split(" ");

    if (play.length != 2) return total;

    if (eval(play[0]) == eval(play[1])) {
      //draw
      total += 3;
    } else if (
      (eval(play[0]) == 1 && eval(play[1]) == 2) ||
      (eval(play[0]) == 3 && eval(play[1]) == 1) ||
      (eval(play[0]) == 2 && eval(play[1]) == 3)
    ) {
      //win
      total += 6;
    }

    total += eval(play[1]); //always add value of played

    return total;
  }, 0);

  console.log(r);
});

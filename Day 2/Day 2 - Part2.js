const fs = require("fs");

const matchups = {
  1: {
    //Rock
    winAgainst: 3,
    loseAgainst: 2,
  },
  2: {
    //Paper
    winAgainst: 1,
    loseAgainst: 3,
  },
  3: {
    //Scissors
    winAgainst: 2,
    loseAgainst: 1,
  },
};

fs.readFile("./D2.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const X = 1; //rock
  const Y = 2; //paper
  const Z = 3; //scissor

  const A = 1; //rock
  const B = 2; //paper
  const C = 3; //scissor

  let r = input.split("\n").reduce((total, turn) => {
    const play = turn.split(" ");

    if (play.length != 2) return total;

    let choice;

    if (play[1] == "Y") {
      //draw
      total += 3;
      choice = eval(play[0]);
    } else if (play[1] == "X") {
      //lose
      choice = matchups[eval(play[0])].winAgainst;
    } else if (play[1] == "Z") {
      //win
      total += 6;
      choice = matchups[eval(play[0])].loseAgainst;
    }

    total += choice; //always add value of played

    return total;
  }, 0);

  console.log(r);
});

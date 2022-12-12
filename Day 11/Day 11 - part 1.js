const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  input = `
Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

  let monkeys = [];

  input.split("\n\n").forEach((m, i) => {
    monkeys.push({
      nb: i,
      items: m
        .match(/Starting items: (\d*[, \d]*)/)[1]
        .split(", ")
        .reverse(),
      op: m.match(/Operation: (.*)/)[1].replace(/new/, "newV"),
      test: m.match(/Test: divisible by (\d*)/)[1],
      testTrue: m.match(/If true: throw to monkey (\d*)/)[1],
      testFalse: m.match(/If false: throw to monkey (\d*)/)[1],
      inspectCount: 0,
    });
  });

  const NB_TURNS = 20;

  console.log(monkeys);

  for (t = 0; t < NB_TURNS; t++) {
    monkeys.forEach((mk) => {
      for (i = mk.items.length - 1; i >= 0; i--) {
        let old = parseInt(mk.items[i]);
        let newV;
        eval(mk.op);

        mk.inspectCount++;

        //worry drop
        newV = Math.floor(newV / 3);
        mk.items[i] = newV;

        //test
        if (newV % mk.test == 0) {
          monkeys[mk.testTrue].items.unshift(mk.items.splice(i, 1)[0]);
        } else {
          monkeys[mk.testFalse].items.unshift(mk.items.splice(i, 1)[0]);
        }
      }
    });
  }

  const monkeyBusiness = monkeys
    .sort((mk1, mk2) => {
      return mk1.inspectCount - mk2.inspectCount;
    })
    .reverse()
    .splice(0, 2)
    .reduce((total, mk) => (total *= mk.inspectCount), 1);

  console.log(monkeyBusiness);
});

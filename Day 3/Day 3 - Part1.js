const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  );

  const total = input.split("\n").reduce((total, bagContent) => {
    if (bagContent == "") return total;

    arrayContent = bagContent.split("");

    const c1 = arrayContent.splice(0, arrayContent.length / 2);
    const c2 = [...arrayContent];

    const totalBag = c1
      .reduce((doubles, item) => {
        let index = c2.indexOf(item);
        if (index != -1 && doubles.indexOf(item) == -1) {
          doubles.push(item);
        }
        return doubles;
      }, [])
      .reduce((total, item) => {
        console.log(item, alphabet.indexOf(item) + 1);
        return (total += alphabet.indexOf(item) + 1);
      }, 0);

    return (total += totalBag);
  }, 0);

  console.log(total);
});

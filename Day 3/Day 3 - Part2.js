const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(
    ""
  );

  let data = input.split("\n");
  let groups = [];

  do {
    groups.push(data.splice(0, 3));
  } while (data.length != 0);

  const total = groups.reduce((total, group) => {
    return (total +=
      alphabet.indexOf(
        group[0].split("").filter((value) =>
          group[1]
            .split("")
            .filter((value) => group[2].split("").includes(value))
            .includes(value)
        )[0]
      ) + 1);
  }, 0);

  console.log(total);
});

const fs = require("fs");

fs.readFile("./D1.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  const total = input
    .split("\n\n")
    .map((elfStack) => {
      return elfStack.split("\n").reduce((prev, current) => {
        if (current != "") {
          return (prev += parseInt(current));
        }
      }, 0);
    })
    .sort((a, b) => {
      return b - a;
    })
    .slice(0, 3)
    .reduce((total, indTotal) => (total += indTotal), 0);

  console.log(total);
});

const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  let result;
  for (i = 0; i < input.length - 3; i++) {
    const v = [input[i], input[i + 1], input[i + 2], input[i + 3]];
    const d = v.filter((item, index) => v.indexOf(item) != index);
    if (d.length == 0) {
      result = i + 4;
      break;
    }
  }
  console.log(result);
});

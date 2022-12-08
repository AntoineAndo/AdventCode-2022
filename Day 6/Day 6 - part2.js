const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  // input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

  const MARKER_LENGTH = 14;

  let result;
  for (i = 0; i < input.length - MARKER_LENGTH - 1; i++) {
    const m = input.substr(i, MARKER_LENGTH).split("");
    const d = m.filter((item, index) => m.indexOf(item) != index);
    if (d.length == 0) {
      result = i + MARKER_LENGTH;
      break;
    }
  }
  console.log(result);
});

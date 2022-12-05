const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  //   input = `2-4,6-8
  // 2-3,4-5
  // 5-7,7-9
  // 2-8,3-7
  // 6-6,4-6
  // 2-6,4-8
  // `;

  const result = input
    .split("\n")
    .filter((l) => l != "")
    .map((line, i) => {
      return line.split(",").map((range) => {
        const length =
          parseInt(range.split("-")[1]) - parseInt(range.split("-")[0]) + 1;
        const zoneList = [...Array(length).keys()].map(
          (i) => parseInt(range.split("-")[0]) + i
        );
        return zoneList;
      });
    })
    .reduce((acc, line) => {
      let overlap = line[0].filter((v) => line[1].includes(v));
      if (
        overlap.length == line[0].length ||
        overlap.length == line[1].length
      ) {
        // console.log(line[1].length);
        // console.log("overlap", overlap.length);
        return (acc += 1);
      }
      return acc;
    }, 0);

  console.log(result);
});

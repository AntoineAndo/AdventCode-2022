const fs = require("fs");

fs.readFile("./input.txt", "utf8", (err, input) => {
  input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

  let rows = input.split("\n").filter((r) => r != "");

  let currentElevation = "a";

  let initialPosition;
  let targetPosition;

  let adjacencyMatrix = [];
  let visited = Array(rows.length).fill(Array(rows[0].length));

  const getSurroundingCases = (y, x) => {
    let c = [y, x];
    currentElevation = rows[c[0]][c[1]];

    let r = [];

    if (
      //RIGHT
      rows[c[0]][c[1] + 1] != undefined &&
      (currentElevation.charCodeAt(0) -
        97 -
        (rows[c[0]][c[1] + 1].charCodeAt(0) - 97) >=
        -1 ||
        currentElevation == "S") //Check if the elevation is equal or lower
    ) {
      let truc = [c[0], c[1] + 1];
      r.push(truc);
    }

    if (
      //LEFT
      rows[c[0]][c[1] - 1] != undefined && //Check if it doesnt go too far left
      (currentElevation.charCodeAt(0) -
        97 -
        (rows[c[0]][c[1] - 1].charCodeAt(0) - 97) >=
        -1 ||
        currentElevation == "S") //Check if the elevation is equal or lower
    ) {
      let truc = [c[0], c[1] - 1];
      r.push(truc);
    }

    if (
      //TOP
      rows[c[0] - 1] != undefined && //Check if it doesnt go too far up
      (currentElevation.charCodeAt(0) -
        97 -
        (rows[c[0] - 1][c[1]].charCodeAt(0) - 97) >=
        -1 ||
        currentElevation == "S") //Check if the elevation is equal or lower
    ) {
      let truc = [c[0] - 1, c[1]];
      r.push(truc);
    }

    if (
      //BOTTOM
      rows[c[0] + 1] != undefined && //Check if it doesnt go too far down
      (currentElevation.charCodeAt(0) -
        97 -
        (rows[c[0] + 1][c[1]].charCodeAt(0) - 97) >=
        -1 ||
        currentElevation == "S") //Check if the elevation is equal or lower
    ) {
      let truc = [c[0] + 1, c[1]];
      r.push(truc);
    }

    return r;
  };

  const display = (pos) => {
    let is = input.split("\n");
    is[pos[0]] =
      is[pos[0]].substring(0, pos[1]) +
      "#" +
      is[pos[0]].substring(pos[1] + 1, is[pos[0]].length);

    console.clear();
    process.stdout.write(is.join("\n"));
  };

  const delay = async (ms = 1000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bfs = async (start) => {
    const queue = [start];
    const distance = [];
    if (distance[start[0]] == undefined) {
      distance[start[0]] = [];
    }
    distance[start[0]][start[1]] = 0;
    while (queue.length > 0) {
      pos = queue.shift();

      display(pos);

      if (targetPosition[0] == pos[0] && targetPosition[1] == pos[1]) {
        break;
      }

      //check if any of the child node is target
      adjacencyMatrix[pos[0]][pos[1]].forEach((node) => {
        if (
          visited.find((n) => n[0] == node[0] && n[1] == node[1]) == undefined
        ) {
          queue.push(node);
          visited.push(node);

          if (distance[node[0]] == undefined) {
            distance[node[0]] = [];
          }
          distance[node[0]][node[1]] = parseInt(distance[pos[0]][pos[1]]) + 1;
        }
      });
      await delay(200);
    }

    console.log("\n");
    console.log(
      "shortest distance",
      distance[targetPosition[0]][targetPosition[1]]
    );
  };

  rows.forEach((row, y) => {
    if (row.indexOf("S") != -1) {
      initialPosition = [y, row.indexOf("S")];
    }
    if (row.indexOf("E") != -1) {
      let endIndex = row.indexOf("E");

      let newRow =
        row.substring(0, endIndex) +
        "z" +
        row.substring(endIndex + 1, row.length);
      rows[y] = newRow;
      targetPosition = [y, endIndex];
    }
  });

  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (adjacencyMatrix[y] == undefined) {
        adjacencyMatrix[y] = [];
      }
      adjacencyMatrix[y][x] = getSurroundingCases(y, x);
    });
  });

  console.log(JSON.stringify(adjacencyMatrix));

  bfs(initialPosition);
});

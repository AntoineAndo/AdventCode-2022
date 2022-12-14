const fs = require("fs");
const { bfs } = require("../utils");

fs.readFile("./input.txt", "utf8", (err, input) => {
  //   input = `Sabqponm
  // abcryxxl
  // accszExk
  // acctuvwj
  // abdefghi`;

  let rows = input.split("\n").filter((r) => r != "");

  let currentElevation = "a";

  let initialPosition;
  let targetPosition;

  let adjacencyMatrix = [];

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

  const initialPositions = [];
  rows.forEach((row, y) => {
    row.split("").forEach((cell, x) => {
      if (adjacencyMatrix[y] == undefined) {
        adjacencyMatrix[y] = [];
      }
      adjacencyMatrix[y][x] = getSurroundingCases(y, x);

      if (cell == "a" || cell == "S") {
        initialPositions.push([y, x]);
      }
    });
  });

  console.log(initialPositions);

  const result = initialPositions
    .map((start) => {
      return bfs(start, targetPosition, adjacencyMatrix);
    })
    .sort()
    .shift();

  console.log(result);
});

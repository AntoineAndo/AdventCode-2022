function bfs(start, end, adjacencyMatrix) {
  const visited = [];
  const queue = [start];
  const distance = [];
  if (distance[start[0]] == undefined) {
    distance[start[0]] = [];
  }
  distance[start[0]][start[1]] = 0;
  while (queue.length > 0) {
    pos = queue.shift();

    // display(pos);

    if (end[0] == pos[0] && end[1] == pos[1]) {
      return distance[end[0]][end[1]];
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
  }

  return undefined;
}

module.exports = { bfs };

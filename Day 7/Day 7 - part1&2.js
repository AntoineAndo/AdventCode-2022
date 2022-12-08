const fs = require("fs");

const getFolderFromPath = (path) => {
  let currentFolder = d;

  path.forEach((folderName) => {
    if (!currentFolder.notFound) {
      nextFolder = currentFolder.dirs.find((dir) => {
        return dir.name == folderName;
      });
      if (nextFolder == undefined) {
        currentFolder = {
          notFound: true,
          parent: currentFolder,
        };
      } else {
        currentFolder = nextFolder;
      }
    }
  });

  return currentFolder;
};

const createDir = (parent, name) => {
  return {
    name,
    files: [],
    dirs: [],
  };
};

const d = {
  name: "/",
  files: [],
  dirs: [],
};

fs.readFile("./input.txt", "utf8", (err, input) => {
  if (err) {
    console.error(err);
    return;
  }

  let path = [];

  const inputSplit = input.split("\n");

  for (i = 0; i < inputSplit.length - 1; i++) {
    if (inputSplit[i] == "") continue;

    const lineSplit = inputSplit[i].split(" ");
    if (lineSplit[0] == "$") {
      //Commands
      if (lineSplit[1] == "cd") {
        if (lineSplit[2] == "/") {
          path = [];
        } else if (lineSplit[2] == "..") {
          path.pop();
        } else if (lineSplit[2] != "") {
          path.push(lineSplit[2]);
          dir = getFolderFromPath(path);
          if (dir.notFound) {
            const newDir = createDir(dir.parent, lineSplit[2]);
            dir.parent.dirs.push(newDir);
          }
        }
      }

      if (lineSplit[1] == "ls") {
        while (
          inputSplit[i + 1] != undefined &&
          inputSplit[i + 1].split(" ")[0] != "$"
        ) {
          if (inputSplit[i + 1].split(" ")[0] != "dir") {
            getFolderFromPath(path).files.push({
              name: inputSplit[i + 1].split(" ")[1],
              size: inputSplit[i + 1].split(" ")[0],
            });
          }
          i++;
        }
      }
    }
  }

  let folderSizes = {};

  const getFolderSize = (d, currentPath) => {
    currentPath = currentPath.concat(d.name + "/");

    let folderSize = d.files.reduce((total, current) => {
      if (current.size == "") return total;

      return (total += parseInt(current.size));
    }, 0);

    d.dirs.forEach((dir) => {
      folderSize += getFolderSize(dir, currentPath);
    });

    folderSizes[currentPath] = folderSize;
    return folderSize;
  };

  // console.log(JSON.stringify(d));

  getFolderSize(d, "");
  const result = Object.values(folderSizes)
    .filter((size) => size <= 100000)
    .reduce((acc, current) => (acc += current), 0);

  console.log("Result 1:", result);

  const DISK_SPACE = 70000000;
  const SPACE_REQUIRED = 30000000;

  const USED_SPACE = folderSizes["//"];
  const EMPTY_SPACE = DISK_SPACE - USED_SPACE;
  const spaceToClean = SPACE_REQUIRED - EMPTY_SPACE;

  console.log("SPACE USAGE: " + USED_SPACE + "/" + DISK_SPACE);
  console.log("REMAINING Space: ", EMPTY_SPACE);

  console.log("NEEDED:", spaceToClean);

  const result2 = Object.values(folderSizes)
    .filter((size) => size >= spaceToClean)
    .sort((a, b) => {
      return a - b;
    })
    .shift();

  console.log(result2);
});

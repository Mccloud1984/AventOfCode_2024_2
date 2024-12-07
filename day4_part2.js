const fs = require("fs");

const text = fs.readFileSync("./data/day4.txt").toLocaleString();

function checkForXMAS(grid) {
  if (grid[0][0] === "M") {
    if (grid[1][1] === "A") {
      if (grid[2][2] === "S") {
        return checkForXMASSecondCross(grid);
      }
    }
  } else if (grid[0][0] === "S") {
    if (grid[1][1] === "A") {
      if (grid[2][2] === "M") {
        return checkForXMASSecondCross(grid);
      }
    }
  }
  console.log("Not found in grid", grid);
}

function checkForXMASSecondCross(grid) {
  if (grid[0][2] === "M") {
    if (grid[1][1] === "A") {
      if (grid[2][0] === "S") {
        // console.log("Found in grid ", grid);
        return true;
      }
    }
  } else if (grid[0][2] === "S") {
    if (grid[1][1] === "A") {
      if (grid[2][0] === "M") {
        // console.log("Found in grid ", grid);

        return true;
      }
    }
  }
}

const lines = text.split("\r\n");
let total = 0;
for (let i = 0; i < lines.length; i++) {
  if (i + 2 === lines.length) break;
  const line = lines[i];
  const letters = line.split("");
  for (let l = 0; l < letters.length; l++) {
    if (l + 2 === letters.length) break;
    const letter = letters[l];
    if (letter === "M" || letter === "S") {
      const grid = [];
      grid[0] = [letters[l], letters[l + 1], letters[l + 2]];
      const line1 = lines[i + 1];
      //   console.log(line1);
      const letters1 = line1.split("");
      grid[1] = [letters1[l], letters1[l + 1], letters1[l + 2]];
      const line2 = lines[i + 2];
      //   console.log(line2);
      const letters2 = line2.split("");
      grid[2] = [letters2[l], letters2[l + 2], letters2[l + 2]];
      if (checkForXMAS(grid)) total++;
    }
  }
}

console.log(total);
//TOTAL WAS 1936

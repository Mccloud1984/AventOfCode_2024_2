const fs = require("fs");
const { listeners } = require("process");

const text = fs.readFileSync("./data/day6.txt").toLocaleString();

const moveDirection = { up: 1, down: 2, left: 3, right: 4 };
const obstical = "#";
const clear = ".";
const marker = "^";
const lines = text.split("\n");
console.log("Total lines", lines.length, " total rows ", lines[0].length);

let currentMoveDirection = moveDirection.up;

function findCurrentPosition(lines) {
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    console.log("Checking for marker on line ", row, ": ", line);
    const columns = line.split("");
    for (let column = 0; column < columns.length; column++) {
      const space = columns[column];
      if (space === marker) {
        console.log("Found marker at ", row, ",", column);
        return { currentRow: row, currentColumn: column };
      }
    }
  }
}
function turnNinty(currentMoveDirection, row, column) {
  switch (currentMoveDirection) {
    case moveDirection.up:
      return {
        currentMoveDirection: moveDirection.right,
        rowIndex: row + 1,
        columnIndex: column + 1,
      };
    case moveDirection.right:
      return {
        currentMoveDirection: moveDirection.down,
        rowIndex: row + 1,
        columnIndex: column - 1,
      };
    case moveDirection.down:
      return {
        currentMoveDirection: moveDirection.left,
        rowIndex: row - 1,
        columnIndex: column - 1,
      };
    case moveDirection.left:
      return {
        currentMoveDirection: moveDirection.up,
        rowIndex: row - 1,
        columnIndex: column + 1,
      };
  }
}
function move(currentMoveDirection, row, column) {
  switch (currentMoveDirection) {
    case moveDirection.up:
      return { rowIndex: row - 1, columnIndex: column };
    case moveDirection.right:
      return { rowIndex: row, columnIndex: column + 1 };
    case moveDirection.down:
      return { rowIndex: row + 1, columnIndex: column };
    case moveDirection.left:
      return { rowIndex: row, columnIndex: column - 1 };
  }
}
const { currentRow, currentColumn } = findCurrentPosition(lines);
//Subtracting one for current direction is up
let rowIndex = currentRow - 1;
let columnIndex = currentColumn;
let line = lines[rowIndex];
let columns = line.split("");
let moves = 1;
let moveArr = [[currentRow, currentColumn]];
console.log(`Current Row: ${rowIndex}, Current Column ${columnIndex}`);
console.log(lines.length, columns.length);
while (
  rowIndex >= 0 &&
  rowIndex < lines.length &&
  columnIndex >= 0 &&
  columnIndex < columns.length
) {
  line = lines[rowIndex];
  if (!line) break;
  columns = line.split("");
  console.log("Current Line: ", line);
  const nextSpace = columns[columnIndex];
  if (nextSpace === obstical) {
    console.log("Obstical at ", rowIndex, ",", columnIndex);
    const turnObj = turnNinty(currentMoveDirection, rowIndex, columnIndex);
    console.log("Turning ", turnObj);
    ({ currentMoveDirection, rowIndex, columnIndex } = turnObj);
  } else if (nextSpace === clear || nextSpace === marker) {
    if (!moveArr.find((x) => x[0] === rowIndex && x[1] === columnIndex))
      moveArr.push([rowIndex, columnIndex]);
    const moveObj = move(currentMoveDirection, rowIndex, columnIndex);
    console.log("Moving", moveObj);
    ({ rowIndex, columnIndex } = moveObj);
    moves++;
  } else {
    console.error("It's borked, space is ", nextSpace);
  }
}
//Total Moves: 5480;
//Total Distinct Moves: 4964;
console.log(moves);
console.log(moveArr.length);
// console.log(JSON.stringify(moveArr));

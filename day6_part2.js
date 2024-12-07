const fs = require("fs");
const { listeners } = require("process");

const text = fs.readFileSync("./data/day6.txt").toLocaleString();

const moveDirection = { up: 1, down: 2, left: 3, right: 4 };
const obstical = "#";
const testObstical = "0";
const clear = ".";
const marker = "^";
const lines = text.split("\n");
// console.log("Total lines", lines.length, " total rows ", lines[0].length);

let currentMoveDirection = moveDirection.up;

function findBeginningPosition(lines) {
  for (let row = 0; row < lines.length; row++) {
    const line = lines[row];
    // console.log("Checking for marker on line ", row, ": ", line);
    const columns = line.split("");
    for (let column = 0; column < columns.length; column++) {
      const space = columns[column];
      if (space === marker) {
        // console.log("Found marker at ", row, ",", column);
        return { beginningRow: row, beginningColumn: column };
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

const { beginningRow, beginningColumn } = findBeginningPosition(lines);
function escapedMap(lines, debug = false) {
  //Subtracting one for current direction is up
  let rowIndex = beginningRow - 1;
  let columnIndex = beginningColumn;
  let line = lines[rowIndex];
  let columns = line.split("");
  const locationTracker = [[beginningRow, beginningColumn, moveDirection.up]];
  if (debug)
    console.log(`Current Row: ${rowIndex}, Current Column ${columnIndex}`);
  while (
    rowIndex >= 0 &&
    rowIndex < lines.length &&
    columnIndex >= 0 &&
    columnIndex < columns.length
  ) {
    line = lines[rowIndex];
    if (!line) break;
    columns = line.split("");
    if (debug) console.log("Current Line: ", line);
    const nextSpace = columns[columnIndex];
    if (nextSpace === obstical || nextSpace === testObstical) {
      if (debug) console.log("Obstical at ", rowIndex, ",", columnIndex);
      const turnObj = turnNinty(currentMoveDirection, rowIndex, columnIndex);
      if (debug) console.log("Turning ", turnObj);
      ({ currentMoveDirection, rowIndex, columnIndex } = turnObj);
    } else if (nextSpace === clear || nextSpace === marker) {
      const foundPreviousPos = locationTracker.find(
        (x) =>
          x.rowIndex === rowIndex &&
          x.columnIndex === columnIndex &&
          x.moveDirection === currentMoveDirection
      );
      if (foundPreviousPos) {
        if (debug) console.log("Found previous position of ", foundPreviousPos);
        return false;
      }
      locationTracker.push({
        rowIndex,
        columnIndex,
        moveDirection: currentMoveDirection,
      });
      const moveObj = move(currentMoveDirection, rowIndex, columnIndex);
      if (debug) console.log("Moving", moveObj);
      ({ rowIndex, columnIndex } = moveObj);
    } else {
      console.error("It's borked, space is ", nextSpace);
    }
  }
  // console.log("Escaped at ", rowIndex, ",", columnIndex);
  return true;
}

function addObstical(lines, atRowIndex, atColumnIndex) {
  const retLines = [...lines];
  let testLine = retLines[atRowIndex];
  const spaces = testLine.split("");
  spaces.splice(atColumnIndex, 1, testObstical);
  testLine = spaces.join("");
  retLines[atRowIndex] = testLine;
  return retLines;
}

let loopCount = 0;
let escapeCount = 0;
let testCount = 0;
for (let testRowIndex = 0; testRowIndex < lines.length; testRowIndex++) {
  testCount++;
  const testLine = lines[testRowIndex];
  const testColumns = testLine.split("");
  // console.log(lines.length, columns.length);
  for (
    let testColumnIndex = 0;
    testColumnIndex < testColumns.length;
    testColumnIndex++
  ) {
    const testSpace = testColumns[testColumnIndex];
    if (testSpace === clear) {
      // console.log("Adding obstical at ", testRowIndex, ",", testColumnIndex);
      const testLines = addObstical(lines, testRowIndex, testColumnIndex);
      // const testLines = addObstical(lines, 111, 46);

      // console.log("Test Line Is: ", testLines[rowIndex]);
      const escaped = escapedMap(testLines); //, true);
      // throw `Escaped: ${escaped}`;
      if (escaped) {
        // console.log("Current Run Escaped");
        escapeCount++;
      } else {
        // console.log("Current run ran in a loop");
        loopCount++;
      }
    } else {
      // console.log(
      //   "Skipping location of ",
      //   testRowIndex,
      //   ",",
      //   testColumnIndex,
      //   " space marker of ",
      //   testSpace
      // );
    }
  }
}

//TRIED 584,585
console.log("Escaped: ", escapeCount);
console.log("Looped: ", loopCount);

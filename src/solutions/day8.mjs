"strict";
import { importDayData, writeFile } from "../utils/fileIO.mjs";

function findMatches(attenna, location, grid) {
  const ret = [];
  const startingRow = location[0];
  for (let rowIndex = startingRow + 1; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      if (cell === attenna) {
        const offsetRow = rowIndex - location[0];
        const offsetColumn = columnIndex - location[1];
        const antinodes = [];
        let ann1Row = location[0] - offsetRow;
        let ann1Column = location[1] - offsetColumn;
        while (
          ann1Row >= 0 &&
          ann1Row < lines.length &&
          ann1Column >= 0 &&
          ann1Column < row.length
        ) {
          antinodes.push([ann1Row, ann1Column]);
          ann1Row -= offsetRow;
          ann1Column -= offsetColumn;
        }
        let ann2Row = rowIndex + offsetRow;
        let ann2Column = columnIndex + offsetColumn;
        while (
          ann2Row >= 0 &&
          ann2Row < lines.length &&
          ann2Column >= 0 &&
          ann2Column < row.length
        ) {
          antinodes.push([ann2Row, ann2Column]);
          ann2Row += offsetRow;
          ann2Column += offsetColumn;
        }
        antinodes.push(...[location, [rowIndex, columnIndex]]);
        ret.push({
          matchCell: cell,
          attenna: [rowIndex, columnIndex],
          offset: [offsetRow, offsetColumn],
          antinodes,
        });
      }
    }
  }

  return ret;
}

const text = importDayData(8);

const lines = text.split("\n");

console.log("Total Rows:", lines.length);

const attennaChecker = /[0-9a-zA-Z]/;
const attennaTracker = [];
for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
  const line = lines[rowIndex];
  for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
    const cell = line[columnIndex];
    // console.log(cell);
    if (cell.match(attennaChecker)) {
      attennaTracker.push({
        cell,
        location: [rowIndex, columnIndex],
        matches: findMatches(cell, [rowIndex, columnIndex], lines),
      });
    }
  }
}

console.log(JSON.stringify(attennaTracker));

console.log("Attenna's Found:", attennaTracker.length);

const allAntinodes = [];
const distinctAntinoids = [];
for (let index = 0; index < attennaTracker.length; index++) {
  const attenna = attennaTracker[index];
  for (let y = 0; y < attenna.matches.length; y++) {
    const matches = attenna.matches[y];
    for (let j = 0; j < matches.antinodes.length; j++) {
      const antinode = matches.antinodes[j];
      allAntinodes.push(antinode);
      if (
        !distinctAntinoids.find(
          (x) => x[0] == antinode[0] && x[1] == antinode[1]
        )
      )
        distinctAntinoids.push(antinode);
    }
  }
}
console.log(JSON.stringify(distinctAntinoids));
console.log("All Antinoids:", allAntinodes.length);
//TRIED: 337:TOHIGH
console.log("Distinct Antinods:", distinctAntinoids.length);

function createMap(lines, distinctAntinoids) {
  const map = [];
  for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
    let newLine = "";
    const line = lines[rowIndex];
    let currentColumn = 0;
    for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
      let cell = line[columnIndex];
      let prevCell = " ";
      if (
        distinctAntinoids.find((x) => x[0] === rowIndex && x[1] === columnIndex)
      ) {
        if (cell === ".") cell = "#";
        else prevCell = "#";
      }
      newLine += `${prevCell}${cell}`;
    }
    map.push(newLine);
  }
  writeFile(map.join("\r\n"), "./data/day8Map.txt");
}

createMap(lines, distinctAntinoids);

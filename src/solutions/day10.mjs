"strict";
import { importDayData, writeFile } from "../utils/fileIO.mjs";

const text = importDayData(10);
const lines = text.split("\n");

const trailStart = 0;
const trailLastSpace = 8;
const trailEnd = 9;

function getPossibleLocations(location) {
  const [cRow, cColumn] = location;
  return [
    [cRow + 1, cColumn],
    [cRow, cColumn + 1],
    [cRow - 1, cColumn],
    [cRow, cColumn - 1],
  ];
}

function AddSpaces(spaces) {
  let ret = "";
  for (let index = 1; index <= spaces; index++) {
    if (index == spaces) ret += `{${index}}`;
    else ret += ".";
  }
  return ret;
}

function findTrails(pSpace, location, grid) {
  const ret = [];
  const nextSpace = pSpace + 1;
  const possLocs = getPossibleLocations(location);
  for (const possLoc of possLocs) {
    const [cRow, cColumn] = possLoc;
    const cLine = grid[cRow];
    if (!cLine) continue;
    const cSpace = Number(cLine[cColumn]);
    console.log(
      `${AddSpaces(
        pSpace
      )}Checking if ${cSpace} is ${nextSpace} at ${cRow}, ${cColumn}`
    );
    if (pSpace === trailLastSpace && cSpace === trailEnd) {
      console.log(`${AddSpaces(pSpace)}Found End of Trail`);
      ret.push({ cSpace, location: [cRow, cColumn] });
    }
    if (cSpace === nextSpace) {
      console.log(`${AddSpaces(pSpace)}Found next space.`);
      const trail = findTrails(nextSpace, [cRow, cColumn], grid);
      if (trail && Array.isArray(trail)) ret.push(...trail);
      else if (trail) ret.push(trail);
    }
  }
  return ret;
}

console.log(lines.length);
const foundPaths = [];
for (let rowIndex = 0; rowIndex < lines.length; rowIndex++) {
  const row = lines[rowIndex];
  if (!row) continue;
  for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
    const cell = Number(row[columnIndex]);
    if (cell === trailStart) {
      console.log(`Finding trails for [${rowIndex}, ${columnIndex}]`);
      let trails = findTrails(cell, [rowIndex, columnIndex], lines);
      if (trails) {
        if (!Array.isArray(trails)) trails = [trails];
        foundPaths.push({ cell, location: [rowIndex, columnIndex], trails });
        // break;
      }
    }
  }
  //   if (foundPaths && foundPaths.length > 1) break;
}

console.log(JSON.stringify(foundPaths));
let distinctTotal = 0;
let totalTrails = 0;
for (const path of foundPaths) {
  if (!path.trails && path.trails.length <= 0) continue;
  const distTrails = [];
  totalTrails += path.trails.length;
  for (const trail of path.trails) {
    if (
      !distTrails.find(
        (x) =>
          x.location[0] === trail.location[0] &&
          x.location[1] === trail.location[1]
      )
    )
      distTrails.push(trail);
  }
  console.log("Path: ", JSON.stringify(path));
  console.log(`Has ${distTrails.length} distinct trails`);
  distinctTotal += distTrails.length;
}

console.log("Part 1 Total:", distinctTotal);
console.log("Part 2 Total:", totalTrails);

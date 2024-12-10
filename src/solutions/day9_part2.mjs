"strict";
import { importFile, writeFile } from "../utils/fileIO.mjs";

const text = importFile(9);

const freeSpace = ".";
const spaceDivider = "|";

console.log(text.length);

let compactedDisk = "";
let fileIndex = 0;
let d = "";
for (let pair = 0; pair < text.length; pair += 2) {
  const [fileLength, freeLength] = text.substring(pair, pair + 2);
  //   console.log(file, free);
  for (let l = 0; l < fileLength; l++) {
    compactedDisk += `${d}${fileIndex}`;
    d = spaceDivider;
  }
  for (let f = 0; f < freeLength; f++) {
    compactedDisk += `${d}${freeSpace}`;
  }
  fileIndex++;
}

console.log(compactedDisk);
console.log("Compacting", compactedDisk.length);

function findNewSpace(spaces, fileBytes) {
  let countOfFreeSpace = 0;
  let firstIndex = fileBytes[0].index;
  for (let index = 0; index < firstIndex; index++) {
    const space = spaces[index];
    if (space === freeSpace) {
      if (++countOfFreeSpace === fileBytes.length) {
        const insertVals = fileBytes.map((x) => x.space);
        const insertStart = index + 1 - countOfFreeSpace;
        // console.log(
        //   `Inserting ${JSON.stringify(
        //     insertVals
        //   )} from ${insertStart} total of ${countOfFreeSpace} spaces`
        // );
        spaces.splice(insertStart, countOfFreeSpace, ...insertVals);
        for (const element of fileBytes) {
          // console.log(`Inserting ${freeSpace} to ${element.index}`);
          spaces[element.index] = freeSpace;
        }
        // console.log(spaces.join(spaceDivider));
        return spaces;
      }
    } else {
      countOfFreeSpace = 0;
    }
  }
  return spaces;
}

let spaces = compactedDisk.split(spaceDivider);
let currentFile = undefined;
let currentFileBytes = [];
let checkedFile = [];

for (let index = spaces.length - 1; index >= 0; index--) {
  const space = spaces[index];
  if (!space) continue;
  if (currentFile && currentFile != space) {
    spaces = findNewSpace(spaces, currentFileBytes);
    currentFile = undefined;
    currentFileBytes = [];
  }
  if (space === freeSpace) {
    currentFile = undefined;
    currentFileBytes = [];
    continue;
  }
  if (!currentFile || currentFile === space) {
    if (!currentFile) {
      if (checkedFile.find((x) => x === space)) continue;
      currentFile = space;
      checkedFile.push(space);
    }

    currentFileBytes.push({ space, index });
  }
}

console.log(spaces.join(spaceDivider));
// console.log(spaces.length);

let checkSum = 0;
for (let index = 0; index < spaces.length; index++) {
  const fileBit = spaces[index];
  if (fileBit == freeSpace) continue;
  checkSum += index * fileBit;
}

console.log("Checksum: ", checkSum);

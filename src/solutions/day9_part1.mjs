"strict";
import { importDayData, writeFile } from "../utils/fileIO.mjs";

const text = importDayData(9);

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

let spaces = compactedDisk.split(spaceDivider);
let lastIndex = spaces.length - 1;
let doubleCheck = false;
for (let index = 0; index < spaces.length; index++) {
  const space = spaces[index];
  if (!space) continue;
  if (space === freeSpace) {
    console.log(
      `Found freespace ${space} at ${index} finding last index of files.`
    );
    let lastSpace = spaces.splice(lastIndex, 1);
    console.log(`${lastSpace} === ${freeSpace} ${lastSpace[0] === freeSpace}`);
    while (lastSpace[0] == freeSpace) {
      //   console.log(spaces.length);
      console.log(`Last index of ${lastIndex} is free space \"${freeSpace}\".`);
      spaces.push(lastSpace);
      //   console.log(spaces.length);
      lastSpace = spaces.splice(--lastIndex, 1);
    }
    console.log(
      `Index of ${lastIndex} is file index ${lastSpace} setting it to index of ${index} and adding free space to the end.`
    );
    // console.log(spaces.length);
    spaces.splice(index, 1, lastSpace);
    // console.log(spaces.length);

    spaces.push(freeSpace);
    lastIndex--;
    // console.log(spaces.length);
    // if (lastIndex < 0) lastIndex = spaces.length - 1;
    if (index + 1 > lastIndex) {
      if (!doubleCheck) {
        index = 0;
        lastIndex = spaces.length - 1;
        doubleCheck = true;
      } else {
        break;
      }
    }
  }
}

console.log(spaces.join(spaceDivider));
// console.log(spaces.length);

let checkSum = 0;
for (let index = 0; index < spaces.length; index++) {
  const fileBit = spaces[index];
  if (fileBit == freeSpace) break;
  checkSum += index * fileBit;
}

console.log("Checksum: ", checkSum);

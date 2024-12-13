"strict";
import {
  importDayData,
  // writeFile,
  // readFile,
  // getFileNames,
  // readAndDeleteFile,
  // deleteAllFiles,
  // moveFile,
  // copyFile,
} from "../utils/fileIO.mjs";
// import { randomUUID } from "crypto";

const text = importDayData(11);

const rules = [
  {
    ruleName: "Value 0",
    test: (value) => Number(value) === 0,
    blink: (value) => ["1"],
  },
  {
    ruleName: "Even Value",
    test: (value) => value.length % 2 == 0,
    blink: (value) => [
      `${Number(value.substring(0, value.length / 2))}`,
      `${Number(value.substring(value.length / 2))}`,
    ],
  },
  {
    ruleName: "2024",
    test: (value) => true,
    blink: (value) => [`${Number(value) * 2024}`],
  },
];
const blinks = 75;
// const stoneLimit = 20_000_000;
// const stoneStorage = "./data/stoneStorage/";
// const stoneFileName = "stoneField";
// let stoneFileId = 0;
// deleteAllFiles(stoneStorage);
// copyFile(
//   "./data/day11.txt",
//   `${stoneStorage}${stoneFileName}_${randomUUID()}.txt`
// );

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function writeStones(stones) {
//   writeFile(
//     stones.join(" "),
//     `${stoneStorage}${stoneFileName}${randomUUID()}.txt`
//   );
//   await sleep(1);
// }
let initialStones = text.split(" ");
let stoneFields = {};
for (const stone of initialStones) {
  if (!stone) continue;
  stoneFields[stone] = 1;
}
// console.log(text);
// console.log("Begining Stones: ", stones.length);
for (let i = 0; i < blinks; i++) {
  console.log("Iteration", i);
  let newStones = {};
  // const stoneFields = getFileNames(stoneStorage).sort((x) => x);
  let stoneKeys = Object.keys(stoneFields);
  for (const stoneKey of stoneKeys) {
    // console.log(`Reading file: ${stoneStorage}${stoneField}`);
    // const text = readAndDeleteFile(`${stoneStorage}${stoneField}`);
    // const stones = text.split(" ");
    // for (const stone of stones) {
    for (const rule of rules) {
      if (rule.test(stoneKey)) {
        let blinkStones = rule.blink(stoneKey);
        if (!blinkStones || blinkStones.length <= 0)
          throw `Failed to blink stone ${stone}, blinkStones: ${JSON.stringify(
            blinkStones
          )}, hit rule ${rule.ruleName}`;
        // newStones.push(...blinkStones);
        // console.log(
        //   `Stone of ${stoneKey} hit rule ${rule.ruleName} blink returned ${blinkStones} with count of ${stoneFields[stoneKey]}`
        // );
        for (const bs of blinkStones) {
          if (Object.keys(newStones).find((x) => x === bs))
            newStones[bs] += stoneFields[stoneKey];
          else newStones[bs] = stoneFields[stoneKey];
        }
        break;
      }
      // }
      // if (newStones.length > stoneLimit) {
      //   await writeStones(newStones);
      //   newStones = [];
      // }
    }
  }
  // console.log(JSON.stringify(newStones));
  stoneFields = newStones;
  newStones = {};
  // console.log("Current Stones: ", newStones.length);
  // await writeStones(newStones);
  // newStones = [];
  // stoneFileId = 0;
  // stoneGroups = newStones;
}

// console.log(stoneGroups);
let total = 0;
// const stoneFields = getFileNames(stoneStorage);
// stoneFields.forEach((x) => (total += readFile(x).split(" ").length));
for (const key in stoneFields) {
  if (Object.prototype.hasOwnProperty.call(stoneFields, key)) {
    const totalStones = stoneFields[key];
    total += totalStones;
  }
}
// console.log(JSON.stringify(stoneFields));
console.log("Total Stones: ", total);

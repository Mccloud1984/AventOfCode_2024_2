const fs = require("fs");

const text = fs.readFileSync("./data/day4.txt").toLocaleString();
// console.log(text);
const regexf = /XMAS/g;
const regexb = /SAMX/g;
let matches = text.match(regexf)?.length ?? 0;
matches += text.match(regexb)?.length ?? 0;

console.log("Line Matches", matches);
let total = matches;
//HORIZANTAL/Vertical
const lines = text.split("\r\n");
// console.log(lines.length);

const slices = [];
const xSlices = [];
const ySlices = [];
for (let lineI = 0; lineI < lines.length; lineI++) {
  let hitYZero = false;
  const letters = lines[lineI].split("");
  //   console.log("Total Letters", letters.length);
  for (let index = 0; index < letters.length; index++) {
    if (!slices[index]) slices[index] = "";
    slices[index] += letters[index];
    const xIndex = lineI + 1 + (index + 1);
    if (!xSlices[xIndex]) xSlices[xIndex] = "";
    // console.log("Adding ", letters[index], " to xslice ", xIndex);

    xSlices[xIndex] += letters[index];
    let yIndex = index + 1 - (lineI + 1);
    if (hitYZero === false && yIndex === 0) hitYZero = true;
    if (hitYZero === false) yIndex = 1000 + Math.abs(yIndex);
    if (!ySlices[yIndex]) ySlices[yIndex] = "";
    // console.log(
    //   "Adding ",
    //   letters[index],
    //   " to yslice ",
    //   yIndex,
    //   " line ",
    //   lineI,
    //   " letter index",
    //   index
    // );
    ySlices[yIndex] += letters[index];
  }
}
// console.log(JSON.stringify(slices));
for (const slice of slices) {
  let matches = slice.match(regexf)?.length ?? 0;
  //   console.log(matches);
  matches += slice.match(regexb)?.length ?? 0;
  //   console.log(matches);

  if (matches) {
    // console.log("Found matches in line ", slice);
    // console.log("Adding ", matches);
    total += matches;
  }
}
console.log("Before xSlices", total);
for (const xSlice of xSlices) {
  if (!xSlice) continue;
  let matches = xSlice.match(regexf)?.length ?? 0;
  matches += xSlice.match(regexb)?.length ?? 0;
  if (matches) {
    // console.log("Adding ", matches.length);
    total += matches;
  }
}
console.log("Before ySlices", total);
// console.log(JSON.stringify(ySlices));
for (const ySlice of ySlices) {
  if (!ySlice) continue;

  let matches = ySlice.match(regexf)?.length ?? 0;
  matches += ySlice.match(regexb)?.length ?? 0;
  if (matches) {
    // console.log("Adding ", matches.length);
    total += matches;
  }
}
console.log("Final total", total);
//TOTAL ANSWER WAS 2633

import { importFile } from "../utils/fileIO.mjs";
const text = importFile("3");

function part1() {
  const matches = text.match(/mul\([0-9]*,[0-9]*\)/g);

  console.log(JSON.stringify(matches));

  let total = 0;

  for (let match of matches) {
    const pair = match.split("(")[1].split(")")[0].split(",");
    //   console.log(pair);
    total += pair[0] * pair[1];
  }

  console.log(total);
}

function part2() {
  const matches = text.match(/mul\([0-9]*,[0-9]*\)|don[']t\(\)|do\(\)/g);

  console.log(JSON.stringify(matches));

  let total = 0;
  let enabled = true;
  for (let match of matches) {
    if (match === "do()") {
      enabled = true;
      continue;
    } else if (match === "don't()") {
      enabled = false;
      continue;
    }
    const pair = match.split("(")[1].split(")")[0].split(",");
    //   console.log(pair);
    if (enabled) total += pair[0] * pair[1];
  }

  console.log(total);
}

part2();

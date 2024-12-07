const fs = require("fs");

const text = fs.readFileSync("./data/day5.txt").toLocaleString();

const lines = text.split("\n");
console.log("Lines loaded", lines.length);
const rules = [];
const updates = [];
let updatesStarted = false;
for (const line of lines) {
  if (!line) {
    updatesStarted = true;
    continue;
  }
  if (updatesStarted) {
    updates.push(line.split(","));
  } else {
    rules.push(line.split("|"));
  }
}

console.log("Rule count", rules.length);
console.log("Updates count", updates.length);

function includesRule(update, rule) {
  if (!update.includes(rule[0]) || !update.includes(rule[1]))
    return { includes: false };
  else {
    const rulePage0 = update.indexOf(rule[0]);
    const rulePage1 = update.indexOf(rule[1]);
    return {
      rulePage0,
      rulePage1,
      ruleValid: rulePage0 < rulePage1,
      includes: true,
    };
  }
}

function validateRule(update, rule) {
  let ruleIndex = 0;
  //   console.log(
  //     "Validating rule ",
  //     JSON.stringify(rule),
  //     " on update ",
  //     JSON.stringify(update)
  //   );
  //   if (!update.includes(rule[0]) || !update.includes(rule[1])) return true;
  //   //   console.log("Update includes rule", rule);
  //   const rulePage0 = update.indexOf(rule[0]);
  //   const rulePage1 = update.indexOf(rule[1]);
  const { ruleValid, includes } = includesRule(update, rule);
  if (includes == false) return true;
  return ruleValid;
  //   console.log("Rule 0 at ", rulePage0, " rule 1 at ", rulePage1);
  //   if (ruleValid) {
  // console.log("Passed rule");
  // return true;
  //   }
  //   console.log("Failed rule", rule);
  return false;
  //   for (const page of update) {

  // console.log("Rule includes Page ", page, ": ", rule.includes(page));
  // if (rule.includes(page) && rule[ruleIndex] != page && rule[ruleIndex]) {
  //   console.log("Returning false");
  //   return false;
  // }
  // if (rule[ruleIndex] == page) ruleIndex++;
  //   }
  //   return true;
}

function validateUpdate(update, rules) {
  for (const rule of rules) {
    if (validateRule(update, rule) === false) {
      console.log("Failed rule ", rule);
      return false;
    }
  }

  return true;
}

function fixUpdate(update, rules) {
  for (const rule of rules) {
    const { rulePage0, rulePage1, ruleValid, includes } = includesRule(
      update,
      rule
    );
    if (includes === false) continue;
    if (ruleValid === true) continue;
    console.log("Fixing Rule", rule);
    const missPlacedPage = update.splice(rulePage1, 1);
    update.splice(rulePage0, 0, missPlacedPage[0]);
    console.log("Fixed Update", JSON.stringify(update));
  }
  return update;
}

function getMiddlePage(update) {
  const middle = Math.ceil(update.length / 2) - 1;
  console.log("Middle page index ", middle, " is ", update[middle]);
  return Number(update[middle]);
}

let totalPart1 = 0;
let totalPart2 = 0;
for (const update of updates) {
  console.log("Validating update", JSON.stringify(update));
  if (validateUpdate(update, rules) === true) {
    totalPart1 += getMiddlePage(update);
  } else {
    let newUpdate = update;
    while (validateUpdate(newUpdate, rules) === false) {
      newUpdate = fixUpdate(newUpdate, rules);
    }
    totalPart2 += getMiddlePage(update);
  }
}
//Part 1 total 7365
// Part 2 total 5770
console.log("Part 1 total", totalPart1);
console.log("Part 2 total", totalPart2);

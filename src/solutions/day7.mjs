import { importFile } from "../utils/fileIO.mjs";
import chalk from "chalk";

const operators = ["+", "*", "||"];

function testEvaluation(testValue, equationValues) {
  let testTotal = 0;
  let [first, ...rest] = equationValues;
  //   console.log(`First: ${first}, rest:`, JSON.stringify(rest));
  //   testTotal = first;
  //   for (const r of rest) {
  //     testTotal += r;
  //     if (testTotal > testValue) {
  //       console.log("Test value is less than values added up.");
  //       return false;
  //     }
  //   }
  //   if (testTotal === testValue) {
  //     console.log("Test value is equal to values added up.");
  //     return true;
  //   }
  //   testTotal = first;
  //   for (const r of rest) {
  //     testTotal *= r;
  //   }
  //   if (testValue > testTotal) {
  //     console.log("Values multiplied are smaller than test value:", testTotal);
  //     return false;
  //   }
  //   if (testValue === testTotal) {
  //     console.log("Test Values are equal to all multiplied");
  //     return true;
  //   }

  let totals = [];
  totals.push(first);
  for (const r of rest) {
    const tTotals = [...totals];
    totals = [];
    for (const t of tTotals) {
      for (const o of operators) {
        switch (o) {
          case "*":
            totals.push(t * r);
            break;
          case "+":
            totals.push(t + r);
            break;
          case "||":
            totals.push(Number(`${t}${r}`));
            break;
        }
      }
    }
  }
  //   console.log("Checking for ", testValue, " in ", JSON.stringify(totals));
  let ret = false;
  totals.forEach((value, index) => {
    if (value === testValue) {
      //   console.log(`Found match ${value} at index ${index} of total array.`);
      ret = true;
      return;
    }
  });
  //   if (ret === false)
  // console.log("Failed to find ", testValue, " in ", JSON.stringify(totals));
  return ret;
}

const text = importFile("7");

const lines = text.split("\n");
console.log("Equations", lines.length);
let finalTotals = [];
lines.forEach((value, index) => {
  if (!value) return;
  let [testValue, equation] = value.split(": ");
  testValue = Number(testValue);
  const equationValues = equation.split(" ").map((x) => Number(x));
  const testResponse = testEvaluation(testValue, equationValues);
  if (testResponse) {
    console.log(chalk.green(`${index}: ${testValue}: ${equation} Passed`));
    finalTotals.push(testValue);
  } else {
    console.log(chalk.red(`${index}: ${testValue}: ${equation} Failed`));
  }
});

//TRIED: 12_506_062_871_850:TOOSMALL
// console.log(JSON.stringify(finalTotals));
let total = 0;
finalTotals.forEach((x) => (total += x));
console.log("---------");
console.log(total);

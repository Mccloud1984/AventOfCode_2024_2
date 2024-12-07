const fs = require("node:fs");

const text = fs.readFileSync("./data/day2.txt").toLocaleString();
const logFile = "./data/day2.csv";
if (fs.existsSync(logFile)) fs.rmSync(logFile);
const writeStream = fs.createWriteStream(logFile);
writeStream.write(
  '"Safe","Index","report","failureCount","FailureIndex","FailureValue"\r\n'
);
function updateWriteStream({
  index,
  report,
  failureCount,
  failureIndex,
  failureValue,
  safe = false,
}) {
  writeStream.write(
    `"${safe}","${index}","${report}","${failureCount}","${failureIndex}","${failureValue}"\r\n`
  );
  if (failureCount > 0) {
    console.log(
      safe ? "Safe " : "Unsafe ",
      index,
      " failureCount ",
      failureCount,
      failureCount > 0 ? ` removed ${failureValue} at ${failureIndex}` : ""
    );
  }
}
// console.log(text);
const textArr = text.split("\n");
// console.log(textArr);
let totalCount = 0;
textArr.forEach((row, rowIndex) => {
  //   console.log("Checking Row ", JSON.stringify(row));
  if (!row) return;
  let rowArr = row.split(" ");
  const origArr = [...rowArr];
  let negitive = null;
  let failureCount = 0;
  let failureIndex = 0;
  let origFailIndex = 0;

  let triedOther = 0;
  let safe = false;
  while (safe === false) {
    safe = false;
    for (let index = 0; index < rowArr.length; index++) {
      if (index === rowArr.length - 1) {
        safe = true;
        updateWriteStream({
          index: rowIndex,
          report: origArr,
          failureCount,
          failureIndex: origFailIndex,
          failureValue: origArr[origFailIndex],
          safe: true,
        });
        totalCount++;
        break;
      }
      const rowItem = rowArr[index];
      const nextItem = rowArr[index + 1];
      const difference = Number(rowItem) - Number(nextItem);
      if (
        rowItem == nextItem ||
        Math.abs(difference) > 3 ||
        isNaN(difference)
      ) {
        if (failureCount === 0) origFailIndex = index + 1;
        failureCount++;
        break;
      } else if (difference <= 3 && difference > 0) {
        if (negitive === null) negitive = false;
        if (negitive === true) {
          if (failureCount == 0) origFailIndex = index + 1;
          failureCount++;
          break;
        }
      } else if (difference < 0 && difference >= -3) {
        if (negitive === null) negitive = true;
        if (negitive === false) {
          if (failureCount === 0) origFailIndex = index + 1;
          failureCount++;
          break;
        }
      }
    }

    if (safe) break;
    if (failureCount === 1) failureIndex = origFailIndex;
    if (failureCount === 1) {
      negitive = null;
      rowArr.splice(failureIndex, 1);
    }
    if (failureCount >= 2) {
      if (triedOther < 2 && failureIndex !== 0) {
        negitive = null;
        rowArr = [...origArr];
        rowArr.splice(--failureIndex, 1);

        triedOther++;
      } else if (triedOther >= 2 || failureIndex === 0) {
        triedOther = 0;
        updateWriteStream({
          index: rowIndex,
          report: origArr,
          failureCount,
          failureIndex: origFailIndex,
          failureValue: origArr[origFailIndex],
          safe: false,
        });

        break;
      }
    }
  }
});
console.log(totalCount, "Safe of ", textArr.length);
writeStream.close();

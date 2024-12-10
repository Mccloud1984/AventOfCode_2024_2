import { list1, list2 } from "../../data/day1.mjs";

let newList1 = list1.sort((a, b) => a - b);
let newList2 = list2.sort((a, b) => a - b);

let totalValue = 0;
newList1.forEach((val, i) => {
  const distance = Math.abs(val - newList2[i]);
  // console.log("Distance of ", val, " and ", list2[i], distance )
  totalValue += distance;
});

console.log(totalValue);

let simularityScore = 0;

newList1.forEach((val, i) => {
  let count = 0;
  newList2.forEach((val2, i2) => {
    if (val === val2) count++;
  });
  const newScore = val * count;
  // console.log(newScore);
  simularityScore += newScore;
});

console.log(simularityScore);

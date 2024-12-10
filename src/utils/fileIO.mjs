import { readFileSync, writeFileSync } from "fs";

export function importFile(day) {
  const text = readFileSync(`./data/day${day}.txt`).toLocaleString();
  return text;
}

export function writeFile(text, filePath) {
  writeFileSync(filePath, text);
}

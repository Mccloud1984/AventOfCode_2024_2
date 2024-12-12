import {
  readFileSync,
  writeFileSync,
  readdirSync,
  rmSync as removeFilesSync,
  copyFileSync,
  existsSync,
} from "fs";
import { emptyDirSync } from "fs-extra";
export function importDayData(day) {
  return readFile(`./data/day${day}.txt`);
}

export function writeFile(text, filePath) {
  if (existsSync(filePath)) throw `Cannot overwrite file path ${filePath}`;
  writeFileSync(filePath, text);
}

export function readFile(filePath) {
  const text = readFileSync(filePath).toLocaleString();
  return text;
}

export function getFileNames(directory) {
  return readdirSync(directory);
}

export function deleteAllFiles(directory) {
  if (!(directory.at(-1) === "/")) directory = `${directory}/`;
  emptyDirSync(`${directory}`);
}

export function moveFile(filePath, newFilePath) {
  copyFile(filePath, newFilePath);
  deleteFile(filePath);
}

export function copyFile(filePath, newFilePath) {
  copyFileSync(filePath, newFilePath);
}

export function deleteFile(filePath) {
  removeFilesSync(filePath);
}

export function readAndDeleteFile(filePath) {
  const text = readFile(filePath);
  deleteFile(filePath);
  return text;
}

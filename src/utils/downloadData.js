//TO RUN: COOKIE={} DAY={} node data/downloadData.js

const fs = require("node:fs");
const content = "Some content!";
const year = "2024";

const cookie = process.env.COOKIE;
if (!cookie) throw "Must supply COOKIE.";
const day = process.env.DAY;
if (!day) throw "Must supply day";
const url = `https://adventofcode.com/${year}/day/${day}/input`;
const fileName = `day${day}.txt`;
fetch(url, {
  headers: {
    cookie,
  },
})
  .then((data) => {
    return data.text();
  })
  .then((text) => {
    try {
      fs.writeFileSync(`./data/${fileName}`, text);
    } catch (error) {
      console.error("Failure writing data to file.", error);
    }
  })
  .catch((error) => {
    console.error("Failure downloading file", error);
  });

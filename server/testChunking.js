const fs = require("fs");

const chunkers = require("./src/chunking");

const sampleText = fs.readFileSync(
  "./sample.txt",
  "utf-8"
);

console.log("========== FIXED ==========");
console.log(
  chunkers.fixed(sampleText).slice(0, 2)
);

console.log("========== SLIDING ==========");
console.log(
  chunkers.sliding(sampleText).slice(0, 2)
);

console.log("========== SEMANTIC ==========");
console.log(
  chunkers.semantic(sampleText).slice(0, 2)
);

console.log("========== HIERARCHICAL ==========");
console.log(
  chunkers.hierarchical(sampleText).slice(0, 1)
);
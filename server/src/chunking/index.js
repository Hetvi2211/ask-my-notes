const fixed = require("./fixedChunking");
const sliding = require("./slidingWindowChunking");
const semantic = require("./semanticChunking");
const hierarchical = require("./hierarchicalChunking");

module.exports = {
  fixed,
  sliding,
  semantic,
  hierarchical,
};
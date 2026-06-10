const { pipeline } = require("@xenova/transformers");

let extractor = null;

const loadModel = async () => {
  if (!extractor) {
    console.log("[embeddings] Loading model: Xenova/all-MiniLM-L6-v2...");
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("[embeddings] Model ready.");
  }
  return extractor;
};

const generateEmbedding = async (text) => {
  const model = await loadModel();

  const output = await model(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};

module.exports = { generateEmbedding };

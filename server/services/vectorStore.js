const fs = require("fs");
const path = require("path");

const VECTORS_PATH = path.join(__dirname, "data", "vectors.json");

const ensureDataDir = () => {
  const dir = path.dirname(VECTORS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const cosineSimilarity = (a, b) => {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

// chunks: [{ page, text, embedding }]
const saveChunks = (chunks) => {
  ensureDataDir();
  fs.writeFileSync(VECTORS_PATH, JSON.stringify(chunks, null, 2), "utf-8");
  console.log(`[vectorStore] Saved ${chunks.length} chunks to ${VECTORS_PATH}`);
};

const searchSimilar = (queryEmbedding, topK = 3) => {
  if (!fs.existsSync(VECTORS_PATH)) {
    throw new Error("Vector store is empty. Upload a document first.");
  }

  const chunks = JSON.parse(fs.readFileSync(VECTORS_PATH, "utf-8"));

  const scored = chunks.map((chunk) => ({
    page: chunk.page,
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ page, text, score }) => ({ page, text, score }));
};

module.exports = { saveChunks, searchSimilar };

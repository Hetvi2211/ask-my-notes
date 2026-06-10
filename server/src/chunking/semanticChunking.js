function semanticChunking(text) {
  const paragraphs = text
    .split("\n\n")
    .filter((paragraph) => paragraph.trim() !== "");

  const chunks = paragraphs.map((paragraph, index) => ({
    chunkId: index + 1,
    content: paragraph.trim(),
  }));

  return chunks;
}

module.exports = semanticChunking;
function slidingWindowChunking(text, chunkSize = 500, overlap = 200) {
  const chunks = [];

  let start = 0;
  let chunkId = 1;

  while (start < text.length) {
    const end = start + chunkSize;

    const chunkText = text.substring(start, end);

    chunks.push({
      chunkId,
      content: chunkText,
    });

    start += chunkSize - overlap;
    chunkId++;
  }

  return chunks;
}

module.exports = slidingWindowChunking;
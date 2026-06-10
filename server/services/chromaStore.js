const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  path: "http://localhost:8000",
});

const COLLECTION_NAME = "documents";


async function getCollection() {
  try {
    return await client.getCollection({
      name: COLLECTION_NAME,
    });
  } catch (error) {
    return await client.createCollection({
      name: COLLECTION_NAME,
      embeddingFunction: null,
    });
  }
}

async function saveChunks(chunks) {
  try {
    await client.deleteCollection({
      name: COLLECTION_NAME,
    });
  } catch {}

  const collection = await getCollection();

  await collection.add({
    ids: chunks.map((c) => `chunk-${c.page}`),
    embeddings: chunks.map((c) => c.embedding),
    documents: chunks.map((c) => c.text),
    metadatas: chunks.map((c) => ({
      page: c.page,
    })),
  });

  console.log(
    `[ChromaDB] Saved ${chunks.length} chunks`
  );
}

async function searchSimilar(
  queryEmbedding,
  topK = 3
) {
  const collection =
    await getCollection();

  const results =
    await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
    });

  const chunks = [];

  for (
    let i = 0;
    i < results.documents[0].length;
    i++
  ) {
    chunks.push({
      page:
        results.metadatas[0][i].page,
      text:
        results.documents[0][i],
      score:
        results.distances[0][i],
    });
  }

  return chunks;
}

module.exports = {
  saveChunks,
  searchSimilar,
};
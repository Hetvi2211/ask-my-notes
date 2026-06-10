const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const { logMetrics } = require("../utils/logMetrics");
const { setPages } = require("../services/documentStore");
const { generateEmbedding } = require("../services/embeddingService");
const { saveChunks } = require("../services/chromaStore");

const chunkers = require("../src/chunking");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }

    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

router.post("/", upload.single("file"), async (req, res) => {
    const startTime = Date.now();
  try {
    const strategy = req.query.strategy || "fixed";

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const data = await pdfParse(req.file.buffer);

    // Apply selected chunking strategy
    const pages = chunkers[strategy](data.text);

    console.log("================================");
    console.log("Chunking Strategy:", strategy);
    console.log("Chunks Created:", pages.length);
    console.log("================================");

    setPages(pages);

    console.log(
      `[upload] Created ${pages.length} chunks`
    );

    console.log("Generating embeddings...");

    const vectorChunks = [];

    for (const page of pages) {
      const embedding = await generateEmbedding(
        page.content
      );

      vectorChunks.push({
        page: page.chunkId,
        text: page.content,
        embedding,
      });

      console.log(
        `[upload] Embedded chunk ${page.chunkId}/${pages.length}`
      );
    }

    await saveChunks(vectorChunks);

    const endTime = Date.now();

    const retrievalTimeMs = endTime - startTime;

    console.log("Retrieval Time:", retrievalTimeMs, "ms");

    logMetrics({
  strategy,
  chunks: pages.length,
  retrievalTimeMs,
  notes:
    strategy === "semantic"
      ? "Better semantic grouping"
      : strategy === "sliding"
      ? "Better context continuity"
      : strategy === "fixed"
      ? "Fast and simple chunking"
      : "Hierarchical experimental strategy",
});


    return res.status(200).json({
      success: true,
      strategy,
      chunksStored: vectorChunks.length,
      totalChunks: pages.length,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;
const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const { setPages } = require("../services/documentStore");
const { generateEmbedding } = require("../services/embeddingService");
const { saveChunks } = require("../services/chromaStore");

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

/**
 * Create text chunks with overlap
 */
function chunkText(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];

  let start = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    chunks.push({
      page: chunks.length + 1,
      text: text.slice(start, end).trim(),
    });

    start += chunkSize - overlap;
  }

  return chunks;
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const data = await pdfParse(req.file.buffer);

    const pages = chunkText(
      data.text,
      1000, // chunk size
      200   // overlap
    );

    setPages(pages);

    console.log(
      `[upload] Created ${pages.length} chunks`
    );

    console.log("Generating embeddings...");

    const vectorChunks = [];

    for (const page of pages) {
      const embedding = await generateEmbedding(
        page.text
      );

      vectorChunks.push({
        page: page.page,
        text: page.text,
        embedding,
      });

      console.log(
        `[upload] Embedded chunk ${page.page}/${pages.length}`
      );
    }

    await saveChunks(vectorChunks);

    return res.status(200).json({
      success: true,
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
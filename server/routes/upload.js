const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const { setPages } = require("../services/documentStore");

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
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const data = await pdfParse(req.file.buffer);

    const pages = [
      {
        page: 1,
        text: data.text,
      },
    ];

    setPages(pages);

    return res.status(200).json({
      success: true,
      pages,
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
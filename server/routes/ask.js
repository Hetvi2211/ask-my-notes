const express = require("express");

const { getPages } = require("../services/documentStore");
const { askGemini } = require("../services/geminiService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    const pages = getPages();

    if (pages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Upload a PDF first",
      });
    }

    const documentText = pages
      .map((page) => page.text)
      .join("\n");

    const result = await askGemini(
      question,
      documentText
    );

    const cleaned = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      answer: parsed.answer,
      citations: parsed.citations || [],
      usage: {
        promptTokens:
          result.usage.promptTokenCount || 0,
        completionTokens:
          result.usage.candidatesTokenCount || 0,
        totalTokens:
          result.usage.totalTokenCount || 0,
      },
    });
  } catch (error) {
    console.error("ASK ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
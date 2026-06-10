const express = require("express");

const { askGemini } = require("../services/geminiService");
const { generateEmbedding } = require("../services/embeddingService");
const { searchSimilar } = require("../services/chromaStore");

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

    const questionEmbedding =
      await generateEmbedding(question);

    const topChunks =
      await searchSimilar(questionEmbedding, 2);
    
    console.log(
      "Retrieved chunks:",
     topChunks.map((chunk) => ({
       page: chunk.page,
       score: chunk.score.toFixed(4)
    }))
   );

    const context = topChunks
      .map(
        (chunk) =>
          `Page ${chunk.page}:\n${chunk.text}`
      )
      .join("\n\n");

    const result = await askGemini(
      question,
      context
    );

    const cleaned = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      answer: parsed.answer,
      citations:
        parsed.citations ||
        topChunks.map((c) => c.page),
      usage: {
        promptTokens:
          result.usage.promptTokenCount || 0,
        completionTokens:
          result.usage.candidatesTokenCount || 0,
        totalTokens:
          result.usage.totalTokenCount || 0,
      },
      retrievedChunks: topChunks.length,
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
require("dotenv").config();

const { askGemini } = require("./services/geminiService");

async function test() {
  try {
    const result = await askGemini(
      "What is the CGPA?",
      "CGPA: 8.56 / 10"
    );

    console.log("Gemini Response:");
    console.log(result);

    if (result.usage) {
      console.log("\nUsage Metadata:");
      console.log(result.usage);
    }
  } catch (error) {
    console.error("Test Failed:");
    console.error(error.message);
  }
}

test();
require("dotenv").config();

const readline = require("readline-sync");

const { GoogleGenAI } = require("@google/genai");

const calculator = require("./tools/calculator");
const webSearch = require("./tools/webSearch");
const slackWebhook = require("./tools/slackWebhook");

const tools = require("./schemas/tools");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function runAgent() {
  console.log("\n==============================");
  console.log("🤖 Gemini Tool Agent");
  console.log("==============================\n");

  const userPrompt = readline.question(
    "Ask something: "
  );

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: userPrompt,

      config: {
        tools: [
          {
            functionDeclarations: tools,
          },
        ],
      },
    });

    const candidate =
      response.candidates?.[0];

    const parts =
      candidate?.content?.parts || [];

    const functionCall = parts.find(
      (part) => part.functionCall
    );

    if (!functionCall) {
      console.log("\nGemini Response:");
      console.log(response.text);

      return;
    }

    const {
      name,
      args,
    } = functionCall.functionCall;

    console.log("\n==============================");
    console.log("🛠 TOOL SELECTED:");
    console.log(name);
    console.log("==============================");

    let toolResult;

    switch (name) {
      case "calculator":
        toolResult = calculator(
          args.operation,
          args.a,
          args.b
        );
        break;

      case "webSearch":
        toolResult = await webSearch(
          args.query
        );
        break;

      case "slackWebhook":
        toolResult =
          await slackWebhook(
            args.message
          );
        break;

      default:
        toolResult =
          "Unknown tool selected";
    }

    console.log("\n==============================");
    console.log("✅ TOOL RESULT:");
    console.log(toolResult);
    console.log("==============================\n");

    // FINAL RESPONSE FROM GEMINI

    const finalResponse =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
User Question:
${userPrompt}

Tool Used:
${name}

Tool Result:
${toolResult}

Generate a final helpful response.
`,
      });

    console.log("🤖 FINAL RESPONSE:");
    console.log(finalResponse.text);

  } catch (error) {
    console.error(
      "\n❌ Error:",
      error.message
    );
  }
}

runAgent();
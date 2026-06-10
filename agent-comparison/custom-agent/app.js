require("dotenv").config();

console.log("KEY =", process.env.GEMINI_API_KEY);

const readline = require("readline-sync");

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const memory = [];

function calculator(expression) {
  try {
    return eval(expression).toString();
  } catch {
    return "Invalid calculation";
  }
}

function search(query) {
  return `Search result for: ${query}`;
}

async function runAgent() {
  console.log("\n==============================");
  console.log("🤖 Custom SDK Agent");
  console.log("==============================");

  while (true) {
    const userPrompt = readline.question(
      "\nAsk something: "
    );

    if (userPrompt.toLowerCase() === "exit") {
      break;
    }

    memory.push({
      role: "user",
      content: userPrompt,
    });

    let toolResult = "";

    // TOOL ROUTING

    if (
      userPrompt.includes("+") ||
      userPrompt.includes("-") ||
      userPrompt.includes("*") ||
      userPrompt.includes("/")
    ) {
      toolResult = calculator(userPrompt);

      console.log("\n🛠 Tool Used: Calculator");
    } else {
      toolResult = search(userPrompt);

      console.log("\n🛠 Tool Used: Search");
    }

    console.log("\n✅ Tool Result:");
    console.log(toolResult);

    const finalPrompt = `
Conversation Memory:
${JSON.stringify(memory, null, 2)}

User Question:
${userPrompt}

Tool Result:
${toolResult}

Generate final response.
`;

// Memory lookup
if (
  userPrompt.toLowerCase().includes("favorite language")
) {
  const item = memory.find(
    m =>
      m.content &&
      m.content.toLowerCase().includes(
        "my favorite language is"
      )
  );

  if (item) {
    console.log("\n🤖 Final Response:");
    console.log(
      item.content.replace(
        "My favorite language is",
        "Your favorite language is"
      )
    );
    continue;
  }
}

// Calculator answer
if (
  userPrompt.includes("+") ||
  userPrompt.includes("-") ||
  userPrompt.includes("*") ||
  userPrompt.includes("/")
) {
  console.log("\n🤖 Final Response:");
  console.log(toolResult);
  continue;
}

console.log("\n🤖 Final Response:");
console.log(toolResult);

    memory.push({
      role: "assistant",
      content: response.text,
    });
  }
}

runAgent();
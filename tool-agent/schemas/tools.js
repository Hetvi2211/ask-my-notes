const tools = [
  {
    name: "calculator",
    description:
      "Perform mathematical calculations like add, subtract, multiply, divide",

    parameters: {
      type: "OBJECT",

      properties: {
        operation: {
          type: "STRING",
          description:
            "Operation to perform: add, subtract, multiply, divide",
        },

        a: {
          type: "NUMBER",
          description: "First number",
        },

        b: {
          type: "NUMBER",
          description: "Second number",
        },
      },

      required: ["operation", "a", "b"],
    },
  },

  {
    name: "webSearch",

    description:
      "Search the web for current information",

    parameters: {
      type: "OBJECT",

      properties: {
        query: {
          type: "STRING",
          description: "Search query",
        },
      },

      required: ["query"],
    },
  },

  {
    name: "slackWebhook",

    description:
      "Send a Slack notification message",

    parameters: {
      type: "OBJECT",

      properties: {
        message: {
          type: "STRING",
          description: "Message to send",
        },
      },

      required: ["message"],
    },
  },
];

module.exports = tools;
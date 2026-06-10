const fs = require("fs");
const path = require("path");

const metricsPath = path.join(
  __dirname,
  "../reports/retrievalMetrics.json"
);

function logMetrics(data) {
  try {
    let existing = [];

    if (fs.existsSync(metricsPath)) {
      const file = fs.readFileSync(metricsPath, "utf-8");

      existing = JSON.parse(file || "[]");
    }

    existing.push(data);

    fs.writeFileSync(
      metricsPath,
      JSON.stringify(existing, null, 2)
    );

    console.log("[Metrics] Logged retrieval metrics");
  } catch (error) {
    console.error(
      "[Metrics] Failed to log metrics:",
      error.message
    );
  }
}

module.exports = { logMetrics };
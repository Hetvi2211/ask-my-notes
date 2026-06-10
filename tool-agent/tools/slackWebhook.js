async function slackWebhook(message) {
  console.log("\n==============================");
  console.log("📢 SLACK WEBHOOK TOOL");
  console.log("==============================");
  console.log("Message Sent:");
  console.log(message);
  console.log("==============================\n");

  return "Slack notification sent successfully.";
}

module.exports = slackWebhook;
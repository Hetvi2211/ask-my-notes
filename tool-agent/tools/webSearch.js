const axios = require("axios");

async function webSearch(query) {
  try {
    console.log("\n🌐 Searching web for:", query);

    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(
      query
    )}&format=json`;

    const response = await axios.get(url);

    const data = response.data;

    // Try abstract answer
    if (data.AbstractText) {
      return data.AbstractText;
    }

    // Try related topics
    if (
      data.RelatedTopics &&
      data.RelatedTopics.length > 0
    ) {
      const firstResult =
        data.RelatedTopics[0];

      if (firstResult.Text) {
        return firstResult.Text;
      }
    }

    return "No search results found.";
  } catch (error) {
    console.error(error.message);

    return "Web search failed.";
  }
}

module.exports = webSearch;
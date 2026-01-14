/**
 * Background script for search suggestions.
 */

browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "fetchSuggestions") {
    fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
        msg.query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        sendResponse(data[1] || []);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        sendResponse([]);
      });
    return true;
  }
});

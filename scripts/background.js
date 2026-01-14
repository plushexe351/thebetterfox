/**
 * Background script for search suggestions.
 */
// Replace about:newtab or about:home with your newtab page
const NEW_TAB_URL = browser.runtime.getURL("index.html");

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "loading" &&
    tab.url &&
    (tab.url.startsWith("about:newtab") || tab.url.startsWith("about:home"))
  ) {
    browser.tabs.update(tabId, { url: NEW_TAB_URL });
  }
});

// Optional: Handle browser startup by targeting the first active tab
browser.tabs.onActivated.addListener((activeInfo) => {
  browser.tabs.get(activeInfo.tabId).then((tab) => {
    if (
      tab.url &&
      (tab.url.startsWith("about:newtab") || tab.url.startsWith("about:home"))
    ) {
      browser.tabs.update(tab.id, { url: NEW_TAB_URL });
    }
  });
});

// Ensure it works on extension load/reload
browser.runtime.onStartup.addListener(() => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    if (
      tabs[0] &&
      tabs[0].url &&
      (tabs[0].url.startsWith("about:newtab") ||
        tabs[0].url.startsWith("about:home"))
    ) {
      browser.tabs.update(tabs[0].id, { url: NEW_TAB_URL });
    }
  });
});

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

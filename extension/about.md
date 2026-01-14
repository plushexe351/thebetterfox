# About thebetterfox extension

This browser extension exists to allow thebetterfox's start page to appear when a new tab is opened. Modern browsers do not provide a direct user setting for changing the default new tab URL, so an extension is required for this behavior.

At the current stage, thebetterfox is still under active development. Because of that, the extension is intentionally minimal: it only contains a lightweight HTML file that redirects the user to:

https://thebetterfox.vercel.app/start

There is no standalone domain yet, and no embedded UI shipped inside the extension itself. The entire experience is hosted remotely so development can move faster and updates can be deployed without pushing new extension versions.

Future plans may include shipping the start page directly inside the extension for better load performance, offline support, and reduced reliance on remote infrastructure. That decision depends on the direction the project takes and feedback from testers.

Whether thebetterfox continues as an actively maintained project depends on interest from early users and contributions from developers during the testing phase. If the experiment proves useful, there is intent to support it; if not, it may remain a niche personal tool.

# How to setup extension dir ? (painful as f\*\*\*, took quite a stroll on me to hack this up for Next.js)

Enable `output: "export"` in `next.config.ts`

Create dir for extension: `mkdir extension`

Create `/extension/background.js`

```js
/**
 * Background script for search suggestions and default home/newpage tabs.
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

```

Run

```bash
npm run build:extension
```

```json
"build:extension": "next build && next export && node fix-inline-script.js && mkdir -p extension/\next && cp -r out/start/_ extension/ && mv extension/index.html extension/start.html && cp -r out/\next/_ extension/\next/ && cp out/favicon.ico extension/ && cp -r public/assets extension/assets"
```

then, run :

```bash
node scripts/fix-inline-script.js
```


followed by

```bash
cp -r out/start/* extension/
cp -r out/next extension/next
cp out/favicon.ico extension/
cp -r public/assets extension/assets
```

finally, run:

```bash
find extension -depth -name '*next*' -exec bash -c 'mv "$1" "${1//next/next}"' _ {} \;
grep -rl "next" extension | xargs sed -i '' 's/next/next/g'
```

Rename `manifest.<browser>.json` to `manifest.json` before adding the extension, and you're good to go.

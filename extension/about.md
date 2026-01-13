# About thebetterfox extension

This browser extension exists to allow thebetterfox's start page to appear when a new tab is opened. Modern browsers do not provide a direct user setting for changing the default new tab URL, so an extension is required for this behavior.

At the current stage, thebetterfox is still under active development. Because of that, the extension is intentionally minimal: it only contains a lightweight HTML file that redirects the user to:

https://thebetterfox.vercel.app/start


There is no standalone domain yet, and no embedded UI shipped inside the extension itself. The entire experience is hosted remotely so development can move faster and updates can be deployed without pushing new extension versions.

Future plans may include shipping the start page directly inside the extension for better load performance, offline support, and reduced reliance on remote infrastructure. That decision depends on the direction the project takes and feedback from testers.

Whether thebetterfox continues as an actively maintained project depends on interest from early users and contributions from developers during the testing phase. If the experiment proves useful, there is intent to support it; if not, it may remain a niche personal tool.
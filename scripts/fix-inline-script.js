const { resolve } = require("path");
const { createHash } = require("crypto");
const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const { globSync } = require("glob");

const distDir = "out"; // your exported Next.js folder
const baseDir = resolve(distDir);
const htmlFiles = globSync(`${baseDir}/**/*.html`);

// make sure the _next/static folder exists for the extension
mkdirSync(`${baseDir}/_next/static`, { recursive: true });

htmlFiles.forEach((file) => {
  const contents = readFileSync(file, "utf8");
  const inlineScripts = [];

  // Collect inline scripts only (skip src scripts)
  let newFile = contents.replace(
    /<script(?![^>]*\ssrc)[^>]*>([\s\S]*?)<\/script>/gi,
    (_, code) => {
      const trimmed = code.trim();
      if (trimmed) inlineScripts.push(trimmed);
      return ""; // remove original inline script
    }
  );

  if (inlineScripts.length) {
    const combined = inlineScripts.join(";\n");
    const hash = createHash("md5").update(combined).digest("hex");
    const scriptFile = `_next/static/extension-inline.${hash}.js`;
    writeFileSync(`${baseDir}/${scriptFile}`, combined, "utf8");

    // inject it before </body>
    newFile = newFile.replace(
      /<\/body>/i,
      `<script src="${scriptFile}"></script></body>`
    );

    writeFileSync(file, newFile, "utf8");
    console.log(
      `Processed ${file}, ${inlineScripts.length} inline scripts moved to ${scriptFile}`
    );
  }
});

console.log("fix-inline-script.js completed ✅");

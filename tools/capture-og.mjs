// Renders tools/og-card.html to assets/og-image.png (1200 x 630), the preview image used when the site is shared.
// Requires: npm install, and a local Chrome (set CHROME_PATH if it is not at the macOS default).
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(join(root, "tools/og-card.html")).href);
await page.waitForTimeout(400);
await page.screenshot({ path: join(root, "assets/og-image.png") });
await browser.close();
console.log("wrote assets/og-image.png");

// Re-renders the evidence screenshots in assets/shots/ from the example app (assets/example-app/index.html).
// Only needed when the example app changes. Requires: npm install, and a local Chrome (set CHROME_PATH if it is not at the macOS default).
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const APP = pathToFileURL(join(root, "assets/example-app/index.html")).href;
const OUT = join(root, "assets/shots") + "/";
const executablePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await chromium.launch({ executablePath, headless: true });
async function shot(name, query, hash, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(`${APP}${query}${hash}`);
  await page.waitForTimeout(250);
  await page.screenshot({ path: OUT + name });
  await ctx.close();
  console.log("shot", name);
}
await shot("evidence-laptop.png", "?as=maker&mc=1", "#approvals", 1440, 900);
await shot("evidence-tablet.png", "?as=maker&mc=1", "#approvals", 820, 1180);
await shot("evidence-phone.png", "?as=maker&mc=1", "#approvals", 390, 844);
await shot("build-look-before.png", "?as=maker&mc=0", "#new-role", 1440, 900);
await shot("build-look-after.png", "?as=maker&mc=1", "#new-role", 1440, 900);
await shot("qa-failed-case.png", "?as=maker&mc=1&bug=1", "#approvals", 1440, 900);
await browser.close();

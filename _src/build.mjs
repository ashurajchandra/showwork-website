// Assembles website/*.html from _src/pages/*.html fragments so the nav and footer live in one place.
// Run:  node _src/build.mjs            (output is plain static HTML next to this folder: host the repository root anywhere)
//       SITE_URL=https://example.com node _src/build.mjs     (the public address; defaults to the GitHub Pages address)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..");
const SITE = "Showwork";
// The public address, used for canonical links, the sitemap and the share image (LinkedIn and X need an absolute URL for it).
// Override it when the site moves, for example to a custom domain:  SITE_URL=https://showwork.com node _src/build.mjs
const SITE_URL = (process.env.SITE_URL || "https://ashurajchandra.github.io/showwork-website").replace(/\/$/, "");

const pages = [
  { file: "index.html", src: "home", nav: "", title: "Showwork: AI agents that deliver Jira tickets as proven pull requests", desc: "A team of AI agents turns a ticket into a pull request, tested in a real browser, with people approving at three gates. It never merges." },
  { file: "pipeline.html", src: "pipeline", nav: "pipeline", title: "The delivery pipeline, stage by stage | Showwork", desc: "Every stage from ticket to pull request: PM, engineering manager, engineer, reviewer, QA, browser evidence and three human gates." },
  { file: "qa.html", src: "qa", nav: "qa", title: "QA that proves it worked | Showwork", desc: "Independent AI QA writes test cases from the acceptance criteria, runs them in a real browser at three screen sizes, and reads results from recorded runs." },
  { file: "orchestrator.html", src: "orchestrator", nav: "orchestrator", title: "One orchestrator, guards in code | Showwork", desc: "An orchestrator runs the whole delivery, while code-enforced guards keep the order safe and tie every approval to the exact thing approved." },
  { file: "trust.html", src: "trust", nav: "trust", title: "Trust, safety and platform | Showwork", desc: "Sealed sandboxes, prompt-injection defences, roles, audit trail, budgets, Jira and GitHub connectors, self-hosting, and the honest limits." },
  { file: "simulator.html", src: "simulator", nav: "simulator", sim: true, title: "Run a delivery in the simulator | Showwork", desc: "An interactive replica of the Showwork run page: approve the three gates and watch a ticket become a pull request." },
  { file: "roadmap.html", src: "roadmap", nav: "roadmap", title: "Today and roadmap | Showwork", desc: "Everything the Showwork delivery pipeline does today, and what ships next: designer agent, task splitting, assertion-level QA and isolated environments." },
  { file: "404.html", src: "notfound", nav: "", noindex: true, title: "Page not found | Showwork", desc: "This page does not exist." },
  { file: "demo.html", src: "demo", nav: "demo", title: "Book a demo | Showwork", desc: "See a Jira ticket become a reviewed pull request with browser evidence in about twelve minutes." },
];

const navItems = [["simulator", "Simulator"], ["pipeline", "Pipeline"], ["qa", "QA proof"], ["orchestrator", "Orchestrator"], ["trust", "Trust & platform"], ["roadmap", "Roadmap"]];

const header = (cur) => `<a class="skip" href="#main">Skip to content</a>
<header class="nav"><div class="wrap">
  <a class="brand" href="index.html" aria-label="${SITE} home"><i></i>${SITE}</a>
  <button class="menu-btn" aria-expanded="false" aria-controls="links">Menu</button>
  <nav class="links" id="links" aria-label="Main">
    ${navItems.map(([k, l]) => `<a href="${k}.html"${cur === k ? ' aria-current="page"' : ""}>${l}</a>`).join("\n    ")}
    <a class="btn btn-primary btn-sm" href="demo.html">Book a demo</a>
  </nav>
</div></header>`;

const footer = `<footer><div class="wrap">
  <div class="fgrid">
    <div><a class="brand" href="index.html"><i></i>${SITE}</a><p style="margin-top:.8rem;max-width:34ch">AI agents that deliver tickets as pull requests that carry their own proof. People approve. Agents never merge.</p></div>
    <div><h5>Product</h5><a href="pipeline.html">The pipeline</a><a href="qa.html">QA proof</a><a href="orchestrator.html">Orchestrator</a><a href="simulator.html">Simulator</a></div>
    <div><h5>Company</h5><a href="trust.html">Trust & safety</a><a href="roadmap.html">Roadmap</a><a href="demo.html">Book a demo</a></div>
    <div><h5>Works with</h5><a href="trust.html#integrations">Jira</a><a href="trust.html#integrations">GitHub</a><a href="trust.html#integrations">MCP connectors</a></div>
  </div>
  <p class="fine">Figures on this site come from our own benchmark and demo runs on a sample application and are described as such. They are not guarantees for your codebase. Product and company names mentioned belong to their owners.</p>
</div></footer>`;

const css = ["styles.css", "extras.css"].map((f) => readFileSync(join(out, "assets", f), "utf8")).join("\n");

// Umami Cloud (cookie-free analytics). data-domains makes it count only the real site, not localhost; do-not-track respects the browser setting.
const UMAMI_ID = "8dc05784-6493-47a3-8129-710ed13225b4";
const analytics = `<script defer src="https://cloud.umami.is/script.js" data-website-id="${UMAMI_ID}" data-domains="${new URL(SITE_URL).hostname}" data-do-not-track="true"></script>`;

// Bump this when assets/og-image.png changes: LinkedIn, Slack and X cache share images by URL.
const OG_VERSION = 2;

// head tags that depend on the deployment: the canonical address (when SITE_URL is set) and noindex for the 404 page
const pageUrl = (p) => `${SITE_URL}/${p.file === "index.html" ? "" : p.file}`;
const extraHead = (p) => [
  SITE_URL && !p.noindex ? `<link rel="canonical" href="${pageUrl(p)}"><meta property="og:url" content="${pageUrl(p)}">` : "",
  SITE_URL && !p.noindex ? [
    `<meta property="og:site_name" content="${SITE}">`,
    `<meta property="og:image" content="${SITE_URL}/assets/og-image.png?v=${OG_VERSION}"><meta property="og:image:width" content="2400"><meta property="og:image:height" content="1260">`,
    `<meta property="og:image:alt" content="Showwork: a ticket goes in, a pull request that proves it works comes out">`,
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${p.title}"><meta name="twitter:description" content="${p.desc}"><meta name="twitter:image" content="${SITE_URL}/assets/og-image.png?v=${OG_VERSION}">`,
  ].join("\n") : "",
  p.noindex ? `<meta name="robots" content="noindex">` : "",
].filter(Boolean).join("\n");

for (const p of pages) {
  const body = readFileSync(join(here, "pages", `${p.src}.frag`), "utf8");
  const html = `<!doctype html>
<html lang="en" data-look="product"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${p.title}</title><meta name="description" content="${p.desc}">
<meta property="og:title" content="${p.title}"><meta property="og:description" content="${p.desc}"><meta property="og:type" content="website">
<meta name="theme-color" content="#f7f8fc">
<link rel="icon" href="favicon.svg" type="image/svg+xml">${extraHead(p)}
<style>${css}</style>
${analytics}
</head><body>
${header(p.nav)}
<main id="main">
${body}
</main>
${footer}
<script src="assets/site.js" defer></script>${p.sim ? '\n<script src="assets/sim.js" defer></script>' : ""}
</body></html>
`;
  writeFileSync(join(out, p.file), html);
  console.log("wrote", p.file);
}

// sitemap.xml and robots.txt (only when SITE_URL is known, since both need absolute URLs)
if (SITE_URL) {
  const urls = pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE_URL}/${p.file === "index.html" ? "" : p.file}</loc></url>`).join("\n");
  writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log("wrote sitemap.xml, robots.txt");
}

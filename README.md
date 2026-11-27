# Showwork website

Static marketing site for the Showwork AI delivery pipeline: home, pipeline walkthrough, QA proof, orchestrator, trust and platform, roadmap, an interactive simulator and a demo-request page. Plain HTML, CSS and a little JavaScript. No framework, no runtime dependencies, no external requests.

## Run it locally

```bash
python3 -m http.server 4173
```

Open http://localhost:4173. Serve it over http: opening the HTML files directly (`file://`) loads the pages but not the simulator, screenshots or example app.

## Layout

```
index.html, pipeline.html, qa.html, ...   built pages (committed, so any static host works with no build step)
assets/styles.css, extras.css             design: the Showwork product look (indigo, Inter, pills)
assets/site.js                            lightbox, tabs, demo form
assets/sim.js                             the delivery simulator (replays an illustrative run)
assets/example-app/                       the example "Atlas Access Admin" app used for the screenshots
assets/shots/                             evidence images rendered from the example app
_src/build.mjs, _src/pages/*.frag         page sources: shared nav and footer live in build.mjs
tools/capture-screenshots.mjs             re-renders assets/shots/ (only if the example app changes)
```

## Edit content

Page text lives in `_src/pages/*.frag` (a page body without `<head>`). Nav, footer and page titles live in `_src/build.mjs`. After editing:

```bash
node _src/build.mjs
```

This rewrites the `*.html` files in the repository root. Commit both the sources and the built pages. The CSS is inlined into every page at build time.

Optional, once the public address is known:

```bash
SITE_URL=https://your-domain.com node _src/build.mjs
```

This adds canonical links and `og:url`, and writes `sitemap.xml` and `robots.txt`.

## Before going live

1. **Demo form.** Requests are delivered by [Web3Forms](https://web3forms.com), which emails each submission to the address registered with the access key in `assets/site.js` (`WEB3FORMS_KEY`). The key is public by design. In the Web3Forms dashboard, restrict it to your live domain, and send yourself one test request after deploying. To change the destination, create a new key and replace it in `site.js`.
2. **Figures and labels.** Numbers in the home "Real runs" table come from real runs. The simulator and the example screenshots are illustrative and are labelled that way. If you replace them with genuine run output, update the labels.
3. **Roadmap page.** Check `_src/pages/roadmap.frag` and remove anything you are not ready to promise.

## Deploy

**GitHub Pages (workflow included).** Push to GitHub, then Settings, Pages, Source: "GitHub Actions". The workflow in `.github/workflows/pages.yml` publishes on every push to `main`. For a custom domain add it under Settings, Pages, and (optionally) a repository variable `SITE_URL`.

**Netlify, Cloudflare Pages, Vercel.** Import the repository. Build command: `node _src/build.mjs` (or none, since the built pages are committed). Publish directory: `.` (the repository root). The `_src/` folder is published too, which is harmless; the GitHub Pages workflow avoids it by copying only the site files.

**Any static host or bucket (S3, nginx).** Upload `*.html`, `favicon.svg`, `assets/` (and `robots.txt`, `sitemap.xml` if present). `_src/`, `tools/` and `package.json` are not needed.

## Regenerate the screenshots

```bash
npm install
npm run screenshots
```

Uses a local Chrome (set `CHROME_PATH` if it is not at the macOS default). The example app accepts `?as=maker|checker`, `?mc=0|1` (maker-checker on) and `?bug=1` (a maker can approve their own request) and the routes `#roles`, `#approvals`, `#new-role`.

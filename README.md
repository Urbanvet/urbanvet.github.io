# UrbanVet website

Statically pre-rendered React site, hosted on GitHub Pages.

## How it works

- `src/app.js` — the whole site (components, content/texts, blog posts, routing).
  Plain `React.createElement` (no JSX, no build-time transpile needed).
- `src/template.html` — the HTML shell (head, fonts, styles, script tags).
- `build.mjs` — the static site generator. It loads `src/app.js` in Node,
  server-renders **every route** to a real `index.html` with the correct
  per-page meta (title, description, canonical, hreflang, OpenGraph, JSON-LD),
  and writes everything to `dist/` together with `sitemap.xml` and `robots.txt`.
- In the browser the same `app.js` hydrates the pre-rendered markup, so
  navigation stays a fast single-page experience.

## Editing content

Edit `src/app.js` (texts live in the `TEXTS`, `ALL_SERVICES` and blog post
objects). Then commit & push — the deploy runs automatically.

## Local build

```bash
npm ci
npm run build      # outputs to dist/
npx serve dist     # optional: preview locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds `dist/`
and publishes it to GitHub Pages.

> One-time setup: in the repo **Settings → Pages → Build and deployment →
> Source**, select **GitHub Actions**.

## Routes

DE: `/`, `/leistungen`, `/ueber-mich`, `/blog`, `/blog/<slug>`, `/kontakt`, `/impressum`
EN: `/en`, `/en/services`, `/en/about`, `/en/blog`, `/en/blog/<slug>`, `/en/contact`, `/en/imprint`

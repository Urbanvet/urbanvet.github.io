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

DE: `/`, `/leistungen`, `/ueber-mich`, `/blog`, `/blog/<slug>`, `/kontakt`, `/impressum`, `/datenschutz`
EN: `/en`, `/en/services`, `/en/about`, `/en/blog`, `/en/blog/<slug>`, `/en/contact`, `/en/imprint`, `/en/privacy`

Old single-URL links like `/?lang=de&page=impressum` are redirected to the real
path in the browser (see `getLegacyQueryRedirect` in `src/app.js`).

## Consent and tracking

- Consent banner: Usercentrics (settings ID in `src/template.html`).
- Google Tag Manager (`GTM-NWL9VX59`) is **not** loaded on page load. A small
  hook in `src/template.html` loads it only after Usercentrics sends a Consent
  Mode update with `ad_storage` or `analytics_storage` granted. Before consent
  (or after "deny all") no request goes to Google.
- In GTM every tag requires consent: Ads tags and the Conversion Linker
  `ad_storage`, the GA4 Google tag `analytics_storage`. Both Google tags fire on
  "All Pages", not "Initialization": Usercentrics pushes a `consent_status`
  event before its consent update, and GTM would evaluate "Initialization" on
  that earlier event while consent is still denied.
- No external fonts; the booking button image is self-hosted
  (`assets/termin-buchen.svg`), so no third-party requests happen before consent.
- When adding a new service (pixel, embed, map, video), gate it on consent too
  and list it in the Datenschutzerklärung (`TEXTS.*.privacy` in `src/app.js`).

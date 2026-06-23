// Static site generator for UrbanVet.
// Loads the exact app.js the browser ships, server-renders every route to a real
// HTML file with per-page meta baked in, and emits a sitemap + robots.txt.
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(ROOT, 'dist');

// --- load the app in a Node sandbox (same source the browser runs) ---
const appSource = fs.readFileSync(path.join(ROOT, 'src', 'app.js'), 'utf8');
const sandbox = { React, console, URL, URLSearchParams, TextEncoder, module: { exports: {} } };
vm.createContext(sandbox);
vm.runInContext(appSource, sandbox, { filename: 'src/app.js' });
const app = sandbox.UrbanVet || sandbox.module.exports;
const { App, getSeoData, buildUrl, ALL_POSTS, Language, Page, SITE_URL } = app;

// --- tiny HTML helpers ---
const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const escHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setAttrById(html, id, attr, value) {
  const re = new RegExp(`(<[^>]*\\bid="${id}"[^>]*\\b${attr}=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`head tag not found: id=${id} attr=${attr}`);
  return html.replace(re, `$1${escAttr(value)}$2`);
}
const setTitle = (html, value) => html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(value)}</title>`);
const setHtmlLang = (html, lang) => html.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`);
function setJsonLd(html, data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return html.replace(/(<script[^>]*\bid="structured-data"[^>]*>)[\s\S]*?(<\/script>)/, `$1${json}$2`);
}

const template = fs.readFileSync(path.join(ROOT, 'src', 'template.html'), 'utf8');

function renderRoute({ language, currentPage, currentPost }) {
  const resolvedPage = currentPage === Page.BLOG_POST && !currentPost ? Page.BLOG : currentPage;
  const seo = getSeoData({ language, currentPage: resolvedPage, currentPost });
  const canonicalUrl = buildUrl({ language, page: resolvedPage, post: currentPost }).href;
  const germanUrl = buildUrl({ language: Language.DE, page: resolvedPage, post: currentPost }).href;
  const englishUrl = buildUrl({ language: Language.EN, page: resolvedPage, post: currentPost }).href;
  const isGerman = language === Language.DE;

  const appHtml = renderToString(
    React.createElement(App, { initialNavigation: { language, currentPage, currentPost } })
  );

  let html = template;
  html = setHtmlLang(html, isGerman ? 'de' : 'en');
  html = setTitle(html, seo.title);
  html = setAttrById(html, 'meta-description', 'content', seo.description);
  html = setAttrById(html, 'canonical-link', 'href', canonicalUrl);
  html = setAttrById(html, 'alternate-de', 'href', germanUrl);
  html = setAttrById(html, 'alternate-en', 'href', englishUrl);
  html = setAttrById(html, 'alternate-default', 'href', germanUrl);
  html = setAttrById(html, 'og-type', 'content', seo.ogType);
  html = setAttrById(html, 'og-title', 'content', seo.title);
  html = setAttrById(html, 'og-description', 'content', seo.description);
  html = setAttrById(html, 'og-url', 'content', canonicalUrl);
  html = setAttrById(html, 'og-image', 'content', seo.image);
  html = setAttrById(html, 'og-locale', 'content', isGerman ? 'de_DE' : 'en_GB');
  html = setAttrById(html, 'twitter-title', 'content', seo.title);
  html = setAttrById(html, 'twitter-description', 'content', seo.description);
  html = setAttrById(html, 'twitter-image', 'content', seo.image);
  html = setJsonLd(html, seo.jsonLd);
  html = html.replace('<!--APP_HTML-->', appHtml);
  return { html, canonicalUrl };
}

const outFileForPath = (pathname) => {
  const rel = pathname.replace(/^\/+/, '');
  return rel === '' ? 'index.html' : `${rel}/index.html`;
};

// --- enumerate routes ---
const STATIC_PAGES = [Page.HOME, Page.SERVICES, Page.ABOUT, Page.BLOG, Page.CONTACT, Page.IMPRESSUM];
const routes = [];
for (const language of [Language.DE, Language.EN]) {
  for (const page of STATIC_PAGES) routes.push({ language, currentPage: page, currentPost: null });
  for (const post of ALL_POSTS[language]) routes.push({ language, currentPage: Page.BLOG_POST, currentPost: post });
}

// --- build ---
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const sitemapUrls = [];
for (const route of routes) {
  const { html, canonicalUrl } = renderRoute(route);
  const pathname = buildUrl({
    language: route.language,
    page: route.currentPage === Page.BLOG_POST && !route.currentPost ? Page.BLOG : route.currentPage,
    post: route.currentPost
  }).pathname;
  const file = path.join(DIST, outFileForPath(pathname));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  sitemapUrls.push(canonicalUrl);
}

// --- client script + static assets ---
fs.copyFileSync(path.join(ROOT, 'src', 'app.js'), path.join(DIST, 'app.js'));

for (const f of ['CNAME', '404.html']) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
}
for (const d of ['assets', 'mobile-tierarztpraxis-berlin', 'mobile-vet-berlin']) {
  const src = path.join(ROOT, d);
  if (fs.existsSync(src)) fs.cpSync(src, path.join(DIST, d), { recursive: true });
}
for (const f of fs.readdirSync(ROOT)) {
  if (/\.(png|jpe?g|svg|webp|ico|gif|avif)$/i.test(f)) {
    fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
  }
}

// --- sitemap + robots ---
const uniqueUrls = [...new Set(sitemapUrls)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
  uniqueUrls.map((u) => `  <url><loc>${escHtml(u)}</loc></url>`).join('\n')
}\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Built ${routes.length} pages (${uniqueUrls.length} unique URLs) into dist/`);

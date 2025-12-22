# Deployment Guide

This document explains how to deploy this repository to **GitHub Pages** and **Vercel** using the same repository.

---

## Build (common step)

Run the production build locally:

```bash
npm ci
npm run build:static
```

The production output is in `dist/`.

---

## Option A — GitHub Pages

There are two common GitHub Pages setups:

1. Use `gh-pages` branch (recommended for automation).
2. Use the `docs/` folder on `main` branch (simple manual method).

### Automatic (GitHub Actions)

A GitHub Action is included at `.github/workflows/deploy-gh-pages.yml` that builds the site and deploys `dist/` to GitHub Pages on every push to `main`. Make sure the repository is configured for GitHub Pages to serve from `gh-pages` branch.

Steps:

- Push your changes to `main`.
- Ensure repository's Pages source is set to the `gh-pages` branch in the repository settings.

### Manual (docs folder)

If you prefer to serve from `docs/` (Project Pages):

```bash
npm run export:gh
# this copies the built site into ./docs
git add docs
git commit -m "build: update docs for gh-pages"
git push
```

Then update the repository Pages settings to serve from the `docs/` folder.

> Note: Update `public/robots.txt` and `scripts/generate-sitemap.cjs` (or `scripts/generate-sitemap.js`) with your canonical URL if you use a custom domain.

---

## Option B — Vercel

Vercel detects Vite projects automatically, but to be explicit:

1. Go to https://vercel.com/new and import this GitHub repository.
2. Set the build command to `npm run build:static` and the output directory to `dist` (these are usually auto-detected from `vercel.json`).
3. Deploy. Vercel will run the build and publish the static `dist/` folder.

---

## Post-deploy SEO checks

- Confirm `sitemap.xml` is available at `https://<your-site>/sitemap.xml`.
- Confirm `robots.txt` is available at `https://<your-site>/robots.txt`.
- Confirm Open Graph image (`/og-image.svg`) is accessible.

---

If you want, I can also add optional automation for tagging, release notes, or preview deploy previews on PRs. Let me know which you'd like next.

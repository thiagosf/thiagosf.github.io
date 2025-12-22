Deployment & SEO summary

I added starter deployment configuration and basic SEO improvements. See details:

- docs/DEPLOY.md — step-by-step instructions for GitHub Pages and Vercel
- `index.html` — meta description, Open Graph, Twitter card, JSON-LD
- `public/robots.txt`, `public/og-image.svg`
- `scripts/generate-sitemap.js` writes `sitemap.xml` into `dist/` after build
- `.github/workflows/deploy-gh-pages.yml` — optional GitHub Action to deploy `dist/` to Pages
- `vercel.json` — Vercel build configuration
- New npm scripts: `postbuild`, `generate:sitemap`, `export:gh`

If you'd like, I can also add a GH Action for preview deploys on PRs or generate PNG social images automatically.

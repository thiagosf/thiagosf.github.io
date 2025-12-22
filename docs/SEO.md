# SEO & Social Preview

Files and changes added to improve SEO and social sharing:

- `index.html`
  - Added **description**, **keywords**, **robots**, **theme-color**, **canonical**.
  - Added Open Graph tags (og:title, og:description, og:image, og:url).
  - Added Twitter card tags.
  - Added a small JSON-LD `Person` object.

- `public/og-image.svg` — social preview image (replace with a PNG for better compatibility if desired).
- `public/robots.txt` — hint to crawlers and points to `sitemap.xml`.
- `scripts/generate-sitemap.cjs` — generates `sitemap.xml` after build using `package.json`'s `homepage` value by default.

How to customize:

- Update the text and URLs in `index.html` (`meta` and JSON-LD) to match your public name and canonical URL.
- Replace `public/og-image.svg` with a high-quality PNG (1200x630) for best results.
- Set `homepage` in `package.json` to your deployment URL (used by the sitemap script).

Per-page metadata:

- This is a Single Page App (SPA). If you need unique metadata per page for social previews or crawlers, consider one of:
  - Pre-rendering pages (e.g., using a static site generator or a prerender step).
  - Server-side rendering or using a meta management solution with prerendered HTML.

If you'd like, I can add per-route meta handling and an automated OG image generator pipeline (PNG output) — tell me which approach you'd prefer.

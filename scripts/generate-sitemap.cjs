const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const base = (process.env.HOMEPAGE || pkg.homepage || 'https://thiagosf.github.io').replace(/\/$/, '')
const pages = ['/', '/#projects', '/#experience', '/#playground', '/#contact']

const now = new Date().toISOString()

const urls = pages.map((p) => `  <url>\n    <loc>${base}${p}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

const distPath = path.resolve(process.cwd(), 'dist')

try {
  if (!fs.existsSync(distPath)) {
    // If dist isn't present, write to project root as fallback
    fs.writeFileSync(path.resolve(process.cwd(), 'sitemap.xml'), xml)
    console.log('Wrote sitemap.xml to project root')
  } else {
    fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml)
    console.log('Wrote sitemap.xml to', path.join(distPath, 'sitemap.xml'))
  }

  // Also write to docs/ for GitHub Pages when using docs/ approach
  const docsPath = path.resolve(process.cwd(), 'docs')
  if (fs.existsSync(docsPath)) {
    fs.writeFileSync(path.join(docsPath, 'sitemap.xml'), xml)
    console.log('Also wrote sitemap.xml to docs/')
  }
} catch (err) {
  console.error('Failed to write sitemap:', err)
  process.exit(1)
}

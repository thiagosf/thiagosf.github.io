# Google Fonts Setup

Install these fonts from Google Fonts for use in your project:

## 1. Sora (Headings & Body)
- Weights: 300 (Light), 400 (Regular), 600 (Semi-Bold), 700 (Bold)
- [View on Google Fonts](https://fonts.google.com/specimen/Sora)

## 2. IBM Plex Mono (Technical Details / Mono)
- Weights: 400 (Regular), 500 (Medium)
- [View on Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono)

## HTML Header Integration

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@300;400;600;700&display=swap" rel="stylesheet">
```

## Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        heading: ['Sora', 'sans-serif'],
      }
    }
  }
}
```

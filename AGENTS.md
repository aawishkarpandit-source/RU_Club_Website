# AGENTS — Project Guide

## Overview
RU Club Motherland is a static HTML/CSS/JS site for an environmental sustainability club at Motherland Secondary School, Pokhara, Nepal. Deployed on Vercel.

## Tech Stack
- Vanilla HTML, CSS, JS (no frameworks, no backend)
- Swiper 11 for carousels
- AOS 2.3 for scroll animations
- GLightbox for image lightbox
- Formspree for contact form
- Google Analytics (GA4) for traffic (placeholder ID: G-XXXXXXXXXX)

## Architecture
```
/                   → Root (all HTML pages)
├── assets/
│   ├── brand/      → Logo files (logo.png, logo_icon.png)
│   ├── icons/      → SVG icon files (brand-colored + functional)
│   └── partners/   → Partner organization logos
├── css/
│   └── style.css   → Single CSS file (all styles)
├── js/
│   ├── theme.js       → Light/dark mode toggle
│   ├── navigation.js  → Mobile menu, header scroll, active link
│   ├── animations.js  → AOS, GLightbox, IntersectionObserver
│   ├── carousel.js    → Swiper initialization
│   ├── forms.js       → Smooth scroll for anchor links
│   ├── missions.js    → Mission data loading, grid, carousel, stats
│   ├── data-loader.js → Renders stats, partners, members, content from JSON
│   ├── components.js  → Loads header/footer HTML, init scroll top + cookie
│   └── main.js        → Orchestrates all async loading
├── data/           → JSON files (content.json, stats.json, etc.)
├── components/     → header.html, footer.html (loaded by components.js)
├── mission/        → Per-mission folders with images + info.json
│   └── list.json   → Master mission manifest
├── .github/workflows/ → auto-mission.yml
└── vercel.json     → Deployment + headers config
```

## Data Flow
1. `components.js` loads `header.html` and `footer.html` into placeholders
2. `main.js` triggers data loading based on which containers exist on the page
3. `missions.js` loads `mission/list.json` then per-mission `info.json`
4. `data-loader.js` loads stats, partners, members, content from `/data/*.json`

## Adding a New Mission
1. Create folder: `mission/your-mission-name/`
2. Drop images inside (jpg/png/webp)
3. Push to `main` branch
4. GitHub workflow auto-creates `info.json` and updates `list.json`

## Key Conventions
- All icons are SVG files in `assets/icons/` — never hardcode SVGs in HTML/JS
- All text content lives in `data/content.json` — edit JSON, not HTML
- New missions need `show: true` in `list.json` to appear on the site
- `.icon-current` class for icons that should inherit text color
- `.social-icon` class for brand-colored social media icons
- All pages share the same JS bundle — each module checks for its container before running

## Build/Deploy
- No build step — pure static files
- Vercel auto-deploys from `main` branch
- `vercel.json` configures clean URLs, CORS, caching, and 404 routing

## SEO
- robots.txt, sitemap.xml, canonical URLs, OG/Twitter tags on all pages
- JSON-LD structured data (Organization, WebSite)
- All images have descriptive alt text + loading="lazy"
- 404.html for custom error page

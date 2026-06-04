# RU Club Motherland 🌿

**Environmental Sustainability Club** at Motherland Secondary School, Pokhara, Nepal.

> Transforming environmental awareness into collective action for a sustainable Pokhara.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)](https://ruclubmss.vercel.app)
[![MIT License](https://img.shields.io/badge/license-MIT-teal)](LICENSE)

---

## About

RU Club Motherland is a student-led environmental initiative at Motherland Secondary School. We organize tree plantations, waste management drives, community clean-ups, and awareness campaigns — working toward a zero-waste ecosystem in Pokhara.

**Website:** [ruclubmss.vercel.app](https://ruclubmss.vercel.app)

## Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | Vanilla HTML, CSS, JavaScript (zero frameworks) |
| **Carousel** | Swiper 11 |
| **Animations** | AOS 2.3 (scroll animations) |
| **Lightbox** | GLightbox |
| **Forms** | Formspree |
| **Analytics** | Google Analytics GA4 (G-HWFPCZ4W1Q, G-HJTLGVDNYK) |
| **Hosting** | Vercel + Cloudflare Pages (auto-deploy from `main`) |
| **CI/CD** | GitHub Actions (auto mission/announcement discovery, image optimization) |

## Project Structure

```
/
├── src/                   → All source files (copied to root by Vercel build)
│   ├── *.html             → 16 HTML pages (clean URLs)
│   ├── static/
│   │   ├── css/           → style.css, navbar.css, responsive.css
│   │   ├── js/            → 13 JS modules
│   │   └── assets/        → brand/, icons/, partners/, images/
│   ├── info/              → JSON data files (content, members, stats, site, partners)
│   ├── components/        → navbar.html + footer.html (loaded dynamically)
│   ├── mission/           → mission-NN/ folders with images + info.json
│   ├── announcements/     → announcement-NN.json files + list.json
│   ├── favicon.ico        → Multi-size ICO from logo_icon.png
│   ├── robots.txt
│   └── sitemap.xml
├── .github/workflows/     → 4 GitHub Actions workflows
├── vercel.json            → Vercel deployment config
├── _redirects             → Cloudflare routing rules
├── AGENTS.md
├── README.md
└── LICENSE
```

## Pages & Routes

All URLs are clean (no `.html` extension) — handled by Vercel `cleanUrls` and Cloudflare `_redirects`.

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, stats, featured mission carousel, partners |
| Announcements | `/announcements` | List of latest club updates |
| Announcement | `/announcement?id=slug` | Single announcement detail |
| Missions | `/missions` | All missions grid |
| Mission Detail | `/mission?id=slug` | Single mission with gallery |
| Members | `/members` | Team roster (teachers + students) |
| Gallery | `/gallery` | Event photo gallery (grouped by mission) |
| Contact | `/contact` | Form + contact details |
| Privacy | `/privacy` | Privacy policy |
| Consent | `/consent` | Cookie consent details |
| License | `/license` | MIT license |
| 404 | `/404` | Styled error page |

## Data Flow

1. **`components.js`** auto-initializes on DOMContentLoaded — fetches site.json, loads navbar/footer into placeholders
2. **`main.js`** (home/members/missions/contact) triggers page-specific data rendering
3. **Missions**: `missions.js` loads `/mission/list.json` then per-mission info.json for carousel + grid
4. **Gallery**: `gallery.js` loads missions and renders each as a card with featured image + image grid + GLightbox
5. **Announcements**: `announcements.js` loads list.json then per-announcement JSON
6. **Partners**: `data-loader.js` renders partner logos in an infinite marquee

## Adding a New Mission

1. Create folder `src/mission/mission-NN/` (next sequential number)
2. Add images (`img-01.jpg`, `img-02.jpg`, ...) + `info.json`
3. Push to `main` — GitHub Actions auto-generates `list.json`

`info.json` format:
```json
{
  "id": "mission-04",
  "title": "Mission Title",
  "description": "Short description",
  "tag": "Tree Plantation",
  "date": "2026-05-30",
  "show": true,
  "images": ["img-01.jpg", "img-02.jpg"]
}
```

Set `"show": false` to hide from the site.

## Editing Content

All text content is in `info/*.json` — no HTML changes needed.

| File | Content |
|---|---|
| `info/content.json` | Hero text, features, CTA, intro |
| `info/members.json` | Team member roster |
| `info/partners.json` | Partner organization logos |
| `info/stats.json` | Homepage statistics |
| `info/site.json` | Social links, contact info, config |

## Icon System

- All icons are individual SVG files in `static/assets/icons/`
- **Never hardcode SVGs inline** in HTML or JS
- Brand-colored icons (social media) — direct colors in the SVG
- Functional icons — use `.icon-current` class to inherit text color

## Development

The site is pure static — no build step required for local dev.

```bash
# Serve locally
npx serve .
# or
python3 -m http.server 8000
```

## Deployment

Pushing to `main` triggers automatic Vercel + Cloudflare Pages deployment.

**Vercel** (`vercel.json`):
- `cleanUrls: true`
- Security headers on all routes
- Cache-Control: immutable for assets, 1h for HTML
- Stale-while-revalidate for JS/CSS

**GitHub Actions** (4 workflows, shared concurrency group):
- `fix-json.yml` — auto-formats all JSON files
- `auto-mission.yml` — scans mission folders, updates list.json
- `auto-announcements.yml` — scans announcements, updates list.json
- `optimize-images.yml` — weekly image compression + WebP generation

## Analytics

GA4 with IDs `G-HWFPCZ4W1Q`, `G-HJTLGVDNYK` in `static/js/analytics.js`.

Tracked: page views, scroll depth (25/50/75/100%), CTA clicks, outbound links, form submissions, theme toggles, mobile menu.

Cookie consent banner appears on first visit — GA4 only loads after explicit acceptance.

## License

MIT — see [LICENSE](LICENSE).

---

_Made with ❤️ by Sincere Bhattarai and the RU Club Motherland team._

### Links

- **Website:** [ruclubmss.vercel.app](https://ruclubmss.vercel.app)
- **GitHub:** [github.com/orgs/RU-Club-Motherland](https://github.com/orgs/RU-Club-Motherland)
- **Facebook:** [RU Club Motherland](https://facebook.com/profile.php?id=61585206314774)
- **Instagram:** [@rucl.ub](https://instagram.com/rucl.ub/)
- **Email:** ruclubmotherland@gmail.com

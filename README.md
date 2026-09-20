# Sanjay Padmaraj — Portfolio

Personal portfolio site for Sanjay Padmaraj — CSE student, software developer, and AI/ML + IoT builder. Static HTML/CSS/JS, deployed via GitHub Pages.

**Live site:** https://123sanjaypadmaraj.github.io/sanjaypadmaraj.github.io-portfolio/

## Sections

- **Home** — intro and quick links
- **About** — education, focus areas
- **What I Do** — AI/LLM, software & web, IoT/embedded
- **Resume** — timeline, core stack, certifications, and a link to the [full resume PDF](Sanjay_Padmaraj_Resume.pdf)
- **Projects** — featured builds with links to GitHub/live demos
- **Achievements** — competitions, patent, hackathons
- **Leadership** — clubs, conferences, community roles
- **Contact** — email, phone, socials, and a message form

## Structure

```
index.html              Single-page site (all sections)
404.html                 Branded not-found page for GitHub Pages
robots.txt, sitemap.xml  Search-engine crawling/indexing
Sanjay_Padmaraj_Resume.pdf   Resume, linked from the Resume and Contact sections
static/
  css/style.css          All styling
  js/script.js           Mobile nav, scroll reveal, active-section highlighting, contact form
  img/                    Project/profile images, favicon.svg, og-cover.jpg (social preview)
```

## Contact form

The form posts to [FormSubmit](https://formsubmit.co/) (`static/js/script.js` submits it via `fetch` to their AJAX endpoint, no backend needed) at `padmarajsanjay@gmail.com`. **First submission after a fresh deploy requires a one-time activation:** FormSubmit emails an "Activation Required" link to that address the first time a message is sent from a new domain — click it once, then all later submissions deliver normally.

## Running locally

No build step or dependencies — just open the file directly, or serve it so relative asset paths resolve cleanly:

```bash
# Option 1: open directly
start index.html   # Windows
open index.html     # macOS

# Option 2: serve locally
python -m http.server 8000
# then visit http://localhost:8000
```

## Editing content

Everything lives directly in `index.html` — update text, project cards, and links there. Swap images in `static/img/`, and replace `Sanjay_Padmaraj_Resume.pdf` with an updated resume (keep the filename, or update the links in `index.html` if you rename it).

## Deploy

Hosted as-is on **GitHub Pages** from this repo (`sanjaypadmaraj.github.io-portfolio`) — no build process required. Push to `main` and Pages serves the updated site.

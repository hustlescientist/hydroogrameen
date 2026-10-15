# HydroGrameen — public website demo

A responsive, accessible, dependency-free website built for **HydroGrameen**, the watershed and aquifer-restoration concept advanced by the **International Institute of Bengal and Himalayan Basins (IIBHB)**.

**Repository:** `https://github.com/hustlescientist/hydroogrameen`  
**Intended GitHub Pages URL:** `https://hustlescientist.github.io/hydroogrameen/`

## Architecture

- Plain `index.html`, `styles.css`, and `app.js` — **no build tools, bundler, Node server, framework, or GitHub Actions** needed.
- Hash-based client-side routing (`#/model`, `#/science`, etc.) works with GitHub Pages and a GoHighLevel HTML element without server rewrites.
- CSS is scoped to `#hydrogrameen-app` to avoid disturbing surrounding GoHighLevel styles.
- Responsive header, mobile menu, keyboard support, semantic markup, a skip link, and motion reduction preferences.
- Interactive conceptual aquifer diagram with three explanatory states.
- Public-facing research and source links; clearly differentiated historical proposals vs. confirmed operating projects.
- Contact form uses `mailto:` during the demo. **It does not send, capture, or store visitor submissions.** A published GHL form URL can replace it later.
- No analytics, backend, tracking pixels, third-party API keys, or cookies.
- Photography is illustrative, not proof of HydroGrameen project deployment; bundled SVG illustrations are provided as network fallbacks.

## Site pages

| Route | Purpose |
| --- | --- |
| `#/` | Homepage, mission, pillars, process, CTAs |
| `#/model` | HydroGrameen framework, building blocks, and FAQs |
| `#/science` | Interactive aquifer diagram, water quality, and evidence standards |
| `#/communities` | Community/cooperative vision and land-use themes |
| `#/projects` | Research contexts and historical proposals, with status labels |
| `#/research` | Historical brochure, EPA project narrative, science, and seminar resources |
| `#/team` | Founder, historical science figures, published IIBHB directory |
| `#/events` | 2025 Dhaka announcement and past Townes and Tagore seminars |
| `#/about` | IIBHB mission, vision, history, and seven values |
| `#/contact` | Collaboration pathways and contact form |

## Deploy to GitHub Pages (no Actions)

1. Push/copy these files to the `main` branch in the repository root. There must be an `index.html` at the root.
2. Open **GitHub → Repository Settings → Pages**.
3. Under **Build and deployment**, set **Source: Deploy from a branch**.
4. Select **Branch: `main`** and **Folder: `/ (root)`**, then **Save**.
5. Open the repository's GitHub Pages URL after GitHub completes publication: `https://hustlescientist.github.io/hydroogrameen/`.

There are no Actions workflow files in this repo. `.nojekyll` disables Jekyll processing, although GitHub Pages may still report a platform deployment status.

## Embed the same site in GoHighLevel

Paste the content of [`embed-snippet.html`](embed-snippet.html) into a **Custom HTML** element on a GHL page. The snippet mounts the SPA inside an isolated `<div id="hydrogrameen-app"></div>` and loads the live CSS/JS from GitHub Pages.

If you want to connect a **native GoHighLevel form**, edit the config inside the snippet:

```html
<script>
window.HG_SITE_CONFIG = {
  mode: 'embed',
  contactEmail: 'info@iibhb.org',
  ghlFormUrl: 'https://api.leadconnectorhq.com/widget/form/YOUR_PUBLISHED_FORM_ID'
};
</script>
```

Until you add a valid published form URL, the demo contact form only prepares an email for the visitor to send using their own email client.

**Best practice:** Embed the website only once per GHL page (single `hydrogrameen-app` ID). Use the website builder's full-width section; remove default section padding as needed. For maximum SEO across individual pages, a future GHL production rebuild can render page-specific sections natively while retaining the same CSS and content architecture.

## Edit content

- `app.js` contains the page templates, navigation, contact setup, photo URLs, and `URLS` source references.
- `styles.css` contains scoped design tokens, layout, components, breakpoints, and reduced-motion behavior.
- `assets/mark.svg` is a **new HydroGrameen demo symbol**, not a replacement for IIBHB's official legacy globe logo.
- `assets/iibhb-historical-mark.webp` was extracted from the supplied 2016-style IIBHB brochure as a **historical** logo reference.
- `assets/hydrogrameen-historical-diagram.webp` and `assets/conference-2025-poster.webp` are optimized, locally served previews of user-supplied archival artwork.
- `assets/HydroGramin--Brochure.pdf` and `assets/Project-Narrative--US_EPA.pdf` preserve the supplied historical documents.
- `assets/landscape.svg`, `assets/river.svg`, and `assets/forest.svg` are original vector illustrations used if remotely hosted illustrative photos are unavailable.
- The public email and postal address are taken from the IIBHB current-site contact page. Verify before production use.

## Content integrity and launch checklist

The supplied brand/copy guides and PDFs describe ambitious technical and institutional claims. The demo deliberately avoids presenting them as independently verified current results.

Before final public launch:

- [ ] Confirm ownership/authorization to publish all historical brochures, photos, and PDFs.
- [ ] Verify institute email, phone, and mailing address; consolidate contact details.
- [ ] Obtain official/current brand marks, project field photographs, and permission to use them.
- [ ] Verify current roster, titles, affiliations, leadership, advisory relationships, and any partner logos.
- [ ] Add dated, citeable pilot evidence before claiming that groundwater recharge is operating, safe, proven, or scaled.
- [ ] Confirm historical event outcome information; all past events remain clearly archived until updated.
- [ ] Connect the live GHL form, CRM workflows, and any donation mechanism only after account configuration and authorization.
- [ ] Review technical copy with a qualified hydrogeologist/environmental scientist and check applicable local standards.
- [ ] Perform cross-browser accessibility, performance, mobile-device, and privacy checks.

## Source basis

1. `IIBHB Brand Guide.md` (working brand standard, October 14, 2026).
2. `IIBHB Website Copy Guide.md` (source-copy extraction, October 14, 2026).
3. HydroGramin brochure (archival two-page model/concept document).
4. `Project-Narrative--US_EPA.pdf` (archival technical training proposal for private wells).
5. IIBHB current website: https://iibhb.org/ and https://iibhb.org/hydrogrameen/
6. IIBHB legacy science and documents website: https://jpatrick96.wixsite.com/iibhb/about1

The unrelated ACNC "Website Updates.docx" was **not** used as a HydroGrameen source. The influencers/contact workbook was not published, since it may include nonpublic information that does not belong on a public website.
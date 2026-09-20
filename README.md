# danadalis.se

Daniel Dahlström's personal link page: own sites, GitHub activity and social channels.
Plain HTML, CSS and a little JavaScript. No build step.

Live at https://danadalis.se, served by GitHub Pages from `main`.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page. Every link, label and description lives here. |
| `css/site.css` | All styles. The tokens at the top follow the visual language of opengym.se. |
| `js/site.js` | Email copy-to-clipboard toast and the GitHub contribution heatmap. |
| `images/sites/` | 1200×630 previews for the site tiles. |
| `images/icons/` | Brand icons, recoloured in CSS with a mask. |
| `images/avatar.png` | Optional square portrait (≥ 256 px). The page hides the image while the file is missing. |
| `CNAME` | Custom domain for GitHub Pages. |

## Common edits

- **Add a site:** copy a `<a class="tile">` block in the `Sites` section of `index.html` and add a 1200×630 JPEG to `images/sites/`.
- **Add a channel:** copy a `<a class="tile channel">` block and put a single-colour SVG in `images/icons/`. Icon paths are root-relative (`/images/icons/…`) because CSS resolves `url()` in a custom property against the stylesheet, not the page.
- **Preview locally:** `python3 -m http.server 8765`, then open http://localhost:8765.

## Hosting

Domain registered at Loopia, DNS at Cloudflare. The apex `A` records and the `www` `CNAME` must stay **DNS only** (grey cloud); proxying them breaks GitHub's certificate renewal.

## Third-party requests

- Google Fonts (Anybody, Inter Tight, JetBrains Mono).
- `github-contributions-api.jogruber.de` for the heatmap. If it fails, the heatmap block stays hidden.

## Credits

The page started from [LittleLink](https://github.com/sethcottle/littlelink) by Seth Cottle. The icons in `images/icons/` come from that project, which is why its MIT licence is kept in `LICENSE.md`.

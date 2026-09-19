# Memories website

Static marketing site for **Memories** (`www.memoriesjournal.com`).

Stack: HTML + CSS + minimal vanilla JS. No React, no npm, no analytics, no remote fonts.
Deployed via **Vercel** (`vercel.json`), not GitHub Pages.

## Local preview

```bash
cd "Memories Website"
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Launch switches

Edit `SITE_STATE` at the top of `main.js`:

| Key | Purpose |
|---|---|
| `isAppStoreLive` | Flip to `true` when the App Store listing exists |
| `appStoreURL` | Real App Store URL |
| `isCloudSyncVerified` | Controls optional iCloud marketing claims if needed |
| `supportEmail` | Support inbox (`zen@meadowresearch.com`) |

When `isAppStoreLive` is true, every `[data-store-cta]` slot renders the App Store badge linking to `appStoreURL`.

## Screenshots

Originals live in `assets/app/`. Responsive WebP derivatives are in `assets/app/optimized/`.

## Open Graph image

Expected (not yet committed as a rendered asset):

- Path: `assets/social/memories-og.jpg`
- Size: 1200 × 630

Metadata already points at that URL. Add the file before launch sharing.

## Legal

Privacy / Terms / Support HTML pages are preserved. PDFs remain in `assets/legal/` for reference.

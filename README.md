# Memories website

Static marketing site for **Memories** (`memoriesjournal.com`).

Built from `WEBSITE_BUILD_SPEC.pdf`: HTML + CSS + minimal vanilla JS. No React, no npm, no analytics, no remote fonts, no Tailwind CDN (per the build spec).

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
| `isCloudSyncVerified` | Flip to `true` only after real-device CloudKit QA |
| `supportEmail` | Real support inbox |

## Screenshots to drop in `assets/`

- `hero-today.png`
- `calendar.png`
- `patterns.png`
- `year-mosaic.png`
- `explore.png`
- `memory-detail.png`
- `media.png` (optional / Plus)
- `on-this-day.png` (optional)
- `og-image.png` (1200×630, later)

Missing screenshots show labeled placeholders instead of broken images.

## Deploy (Vercel)

1. New Vercel project rooted at this folder
2. Framework Preset: Other / static
3. No build command
4. Attach `memoriesjournal.com` and redirect `www` → apex

## Still needed before production

- Real app screenshots
- Final Privacy Policy + Terms copy
- Support email
- App Store URL
- CloudKit marketing copy only after device QA

# Loothub — GTA 6 Companion Site

A static companion site for GTA 6. Ships with a working **Business ROI Calculator**;
map / checklist / money-methods slots are stubbed for launch day.

## Structure

```
gta6-companion/
├── index.html          Landing page + tool grid
├── businesses.html     Business ROI Calculator (the live tool)
├── css/style.css       Shared Vice City theme
├── js/businesses.js    Calculator logic (reads window.GTA_DATA)
├── data/businesses.js  >>> THE DATA YOU SWAP AT LAUNCH <<<
├── robots.txt
└── sitemap.xml
```

There is **no backend**. Everything runs in the browser, so it's fast, free to host,
and great for SEO + ads.

## Preview locally

Just double-click `index.html` — it opens in your browser and works (data is loaded via
a `<script>` tag, not `fetch`, so no local server needed). Selections save via
`localStorage`.

## Deploy (free, no cold starts)

Use **Cloudflare Pages** or **Netlify** — both are free, fast, and give a custom domain.

- **Netlify:** drag the `gta6-companion` folder onto https://app.netlify.com/drop, or connect the repo.
- **Cloudflare Pages:** connect the GitHub repo, framework preset = *None*, build command = *(blank)*, output dir = `/`.

Either way: push to GitHub, it auto-deploys — same flow you already use.

## Launch-day workflow (Nov 19, 2026)

1. Open `data/businesses.js`.
2. Replace the placeholder businesses with the real GTA 6 numbers as they're datamined
   (`setupCost`, `baseProfitPerHour`, and each upgrade's `cost` / `profitBonusPerHour`).
3. Commit + push. The calculator updates automatically — no other file changes.

Speed here is the whole game: being live and accurate in the first 72 hours is the edge.

## Monetization checklist

- [ ] Apply to **Google AdSense early** (needs live content first — that's why the site goes up now).
- [ ] Drop your AdSense code into the `.ad` slots in `index.html` / `businesses.html`.
- [ ] Add affiliate links (guides, gift cards, hardware) where natural.
- [ ] At ~50k sessions/month, apply to **Mediavine / Raptive** (much higher ad rates).

## SEO basics

- Page `<title>`s already target high-intent searches ("GTA 6 business profit calculator").
- Add new guide pages as separate `.html` files and list them in `sitemap.xml`.
- Submit `sitemap.xml` in Google Search Console once deployed.

## Naming / legal

Pick a brand that is **not** a Rockstar trademark (the placeholder here is "VI Hub").
Using "GTA 6" descriptively in titles and content is standard for fan tools; using it
as your brand/domain name is not. The footer disclaimer is already in place.

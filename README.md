# LootHubGG — Independent GTA 6 companion site

Static HTML/CSS/JavaScript website. The public pages cover **confirmed** release dates,
platforms, editions, characters, and settings, alongside clearly labeled pre-launch
analysis. There is no backend and no build step.

## Locally preview

Run `python -m http.server 8000` from the repository root, then open
`http://localhost:8000/` in Chrome. For the launch planner open
`http://localhost:8000/launch-planner.html`.

## Current tools and status

- `launch-planner.html` / `js/launch-planner.js`: working browser-only launch checklist,
  platform and edition selector, official store links, US price comparison.
  Choices and checked steps use localStorage (no server database).
- `map.html`: verified setting/region explainer; the collectible tracking feature
  is **not** live until verified game data exists.
- `checklist.html`: editorial pre-launch 100%-completion explainer, **not** a
  functional 100%-completion tracker.
- `businesses.html`: explanatory guide only; do not publish unverified ROI numbers.
- Legacy `js/map.js`, `js/businesses.js` and `data/` are prototypes; their data
  is not authoritative and should not be promoted to the public site until verified.

## Publishing safety

Keep AdSense site-verification code and `ads.txt` unchanged unless they need an
intentional authorized update. Verify official GTA 6 details on Rockstar's website
before updating content. Never invent prices, game mechanics or map/collectible data.

When you can sign in to GitHub again, publish from the isolated
`adsense-quality-improvements` branch after testing. Do not overwrite unrelated
work or make direct edits to `main` without review.

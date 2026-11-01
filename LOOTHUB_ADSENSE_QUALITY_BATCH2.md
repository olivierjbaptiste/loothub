# LootHubGG — AdSense Quality Improvements Batch 2

**Scope:** Three existing editorial guides only. Apply on the `adsense-quality-improvements` local branch after Batch 1 commit `8eeb066`.

## Why this revision

The prior guides used confident-sounding generalizations from earlier Grand Theft Auto titles. They now separate official GTA 6 facts from assumptions and offer decision-making material useful without fabricated 2026 game data.

- `money-guide.html`: explicit confirmed-vs-unconfirmed information, a reproducible net-income-per-real-hour method and illustrative calculation.
- `business-guide.html`: hypothetical side-by-side startup cost/payback example, definitions, and purchase-verification questions.
- `completion-guide.html`: evidence-based checklist method, session log instructions and transparent verification labels.

## Editing principles

- Rockstar's official GTA 6 page and announcement link appear as sources.
- All made-up example numbers are clearly labeled hypothetical; these are not in-game claims.
- Existing header, nav, footer, analytics, and CSS class framework are preserved.
- This does not guarantee AdSense approval, and no one should request another review until the full website is examined.

## Local verification

1. `git status -sb` and `git diff --check`.
2. Start the local server in project root: `python -m http.server 8000 --bind 127.0.0.1`.
3. Open `/money-guide.html`, `/business-guide.html`, and `/completion-guide.html` and review mobile/desktop readability.
4. Commit only the 4 files included here after reviewing them.

Official reference: https://www.rockstargames.com/VI

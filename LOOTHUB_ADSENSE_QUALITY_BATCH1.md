# LootHubGG — AdSense quality improvements, Batch 1

Source baseline: user's `loothub-source-review.zip`, exported from Git commit
`bec7426` on November 1, 2026. Intended installation branch:
`adsense-quality-improvements`.

## Implemented

1. Added `launch-planner.html` with source-backed GTA 6 platform, edition and
   pre-load information; $79.99 US Standard and $99.99 US Ultimate base prices;
   contextual advice explaining the code-in-box option does NOT contain a disc;
   official store and Rockstar Support citations.
2. Added `js/launch-planner.js` with console/edition/format selector, contextual
   eight-step preparation checklist, automatic progress indicator, reset button,
   and browser-local persistence. Ultimate Edition correctly disables code-in-box.
   No payments, accounts, server-side data transfer or dependencies.
3. Added accessible responsive CSS in `css/style.css`.
4. Linked the planner from homepage, pre-order page, About page and Guides page.
   Added the new page to `sitemap.xml`.
5. Adjusted misleading teaser language in `guides.html` so hypothetical GTA 6
   business and completion features are not presented as confirmed mechanics.
6. Updated README to reflect the current site, not the old placeholder template.

## Quality findings and remaining work

The included `map.html` and `checklist.html` are editorial explainers, not empty
0/0 tools; their previous diagnostic description was outdated. The unused
map/business JS prototypes still exist in the source, but are not promoted as
verified live mechanics. The existing site has significant guide content and legal
pages; these changes are additive and do not establish any guarantee of AdSense
approval. Google's low-value-content decision did not name specific pages.

Future content passes should: compare individual guide pages for duplicate content;
confirm each factual claim and its citation; add editorial analysis, accurate
screenshots and maintenance dates; verify accessibility and internal navigation on
actual devices; assess Search Console crawl/indexing issues. Don't rush another
review request after one patch.

## Validation performed

- Node JavaScript syntax check passed.
- Node behavior tests passed: default plan, US edition prices, Ultimate format
  restrictions, code-in-box tasks, local persistence, checklist reset, store link,
  invalid-state fallback.
- BeautifulSoup internal-page asset/link audit passed (21 HTML pages).
- XML sitemap parsed; 21 unique URLs including launch planner.
- Full browser rendering could not be automated in this environment due a
  restricted browser sandbox. Confirm visual appearance in local Chrome before push.

## Primary official sources (checked Nov 1, 2026)

- https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions
- https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25
- https://www.rockstargames.com/VI/editions
- https://www.playstation.com/en-us/games/grand-theft-auto-vi/
- https://support.google.com/adsense/answer/81904?hl=en

## On the user's Windows PC

1. Confirm branch is `adsense-quality-improvements` using `git status -sb`.
2. Extract the patch ZIP into the repo root with `Expand-Archive -Force`.
3. Use `git status -sb` to inspect the changed files.
4. Preview `launch-planner.html` using `python -m http.server 8000` and Chrome.
5. Do not commit, push or resubmit AdSense until the preview is reviewed.

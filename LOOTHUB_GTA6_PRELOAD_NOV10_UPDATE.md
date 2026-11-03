# LootHubGG — November 3, 2026 GTA 6 pre-load news update

This targeted patch is designed for the source after LootHubGG PR #1 (AdSense quality batches 1+2) was merged into `main`.

## Changes
- `index.html`: correct homepage pre-load date and cite the November 3 Rockstar update.
- `launch-planner.html`: correct the pre-load fact card, decision guidance, and sources; add the 212 GB requirement.
- `js/launch-planner.js`: platform-specific PS5/Xbox times, accurate boxed-code timing, and storage checklist. Existing browser-saved task progress and storage key are preserved.
- `preorder.html`: new pre-load timeline with official citations, and clear digital vs code-in-box differences.
- `release-date.html`: concise official pre-load and storage update.

Official references:
- https://www.rockstargames.com/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10
- https://support.rockstargames.com/articles/7nPqOA2uCbpEQHXx7KVrYd/grand-theft-auto-vi-pre-load-faq

## Safe deployment
1. Start from freshly updated local `main` and create a distinct branch; do not overwrite either branch while the web server is running.
2. Extract repository-relative files into that branch.
3. Review `git diff --check` and `git diff --stat`.
4. Preview homepage, launch planner (PS5 and Xbox, digital and code-in-box), pre-order and release-date pages. Confirm that task checkmarks still persist.
5. Commit and push a PR; merge after Netlify checks and production preview pass. No changes to the already published news post are required.

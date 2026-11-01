# LootHubGG — Example ROI Calculator and wording fix

## Purpose

The Business Guide incorrectly described a Business ROI Calculator as forthcoming, while separate older, unused script and example data files existed in the repository. This update makes a **user-input calculator** available in `businesses.html` and corrects the language around it. It does **not** publish rankings of GTA 6 businesses or pretend example values are real data.

## Files

- `businesses.html`: adds calculator form with five fields and output, plus clear hypothetical disclaimer.
- `js/roi-example.js`: browser-only ROI, payback, and net-return calculator; no data requests or storage.
- `css/style.css`: mobile-friendly styles for calculator form and results.
- `business-guide.html`: replaces the inaccurate coming-soon statement with a link to the working calculator.
- `index.html`, `about.html`, `privacy.html`: correct outdated descriptions of site tools and privacy behavior.

## Math

- Upfront investment = purchase price + upgrades.
- Net income per hour = revenue per hour − operating costs per hour.
- Payback = upfront investment ÷ net income per hour, when investment and net income are positive.
- Period net return = (net income per hour × selected hours) − upfront investment.
- **ROI for selected period** = period net return ÷ upfront investment × 100%.
- Zero investment: ROI is undefined and shown as N/A; zero or negative net earnings have no finite payback.

## Local validation

On the `adsense-quality-improvements` branch, run the Python HTTP server in the project folder and open `http://127.0.0.1:8000/businesses.html#roi-calculator`. Change inputs; check that net income, payback and ROI update. Then check `business-guide.html` link to the calculator. This change does not submit a new AdSense review or deploy the site.

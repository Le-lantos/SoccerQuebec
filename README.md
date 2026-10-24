# LS PRO · Soccer Québec registration guide

Live site: https://le-lantos.github.io/SoccerQuebec/

French (default) and English guides with two registration paths: LS PRO and Québec Cups (Coupe du Québec senior / Coupe des Maîtres).

## Editing

Edit both language sections in guide-data.js. Add verified portalUrl and registrationUrl values. Exact portal instructions and requirements remain drafts pending confirmation. UI translations are in app.js. Brand assets are taken from the supplied LS PRO Word template; preserve their original colors and proportions.

## Sharing

French: ?lang=fr&competition=lspro or ?lang=fr&competition=cups
English: ?lang=en&competition=lspro or ?lang=en&competition=cups
Old competition links redirect to the corresponding combined path. Progress is stored per registration path in this browser and shared between languages.

## Deployment

Commits to main automatically publish through .github/workflows/pages.yml. GitHub Pages source must be GitHub Actions. No build or dependencies are needed.

## Local preview

Run python3 -m http.server 8080 in the source directory.

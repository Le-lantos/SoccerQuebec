# Sportal team registration guide

Independent draft guide for LS PRO (Ligue 1, Ligue 2, Ligue 3, Espoirs), Coupe du Québec senior and Coupe des Maîtres. Original implementation inspired by the checklist structure of the COMET guide; no COMET code, logos or screenshots copied.

## Preview

Open index.html in a browser, or run `python3 -m http.server 8080` in this directory and open http://localhost:8080.

## Maintain

Edit guide-data.js to change instructions, competition names, notes and official links. Set portalUrl and each competition's registrationUrl to verified URLs. Missing links appear as pending, never as fake buttons. Confirm the full registration procedure, exact control labels, eligibility, fees and deadlines before distributing this guide as operational instructions. This is a checklist website: it cannot register teams, pay fees or verify portal approval.

Progress is stored locally per competition. Share a competition directly with `?competition=l1` (also l2, l3, espoirs, senior, masters). Print / save as PDF prints the current competition checklist.

## Publish publicly on GitHub Pages

1. Create a PUBLIC repository named SoccerQuebec in your GitHub account.
2. Upload the contents of this folder, preserving .github/workflows/pages.yml and .nojekyll. Keep index.html at the repository root.
3. Under Settings → Pages → Build and deployment, select GitHub Actions as the source.
4. Run Publish guide to GitHub Pages under Actions, or push a change to main.
5. Wait for the deployment to finish. The public URL will be https://Le-lantos.github.io/SoccerQuebec/.

A public repository exposes every uploaded file. This package contains only public guide content and code; keep team rosters and credentials out of the repository.

No build tools or external libraries required.

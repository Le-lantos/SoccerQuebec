# LS PRO · Soccer Québec — create a team in Spordle ID

Live site: https://le-lantos.github.io/SoccerQuebec/

French and English illustrated team creation instructions, with LS PRO and Québec Cups contexts. Both use the same team creation procedure.

## Source

Annex 2, “Affichage des noms d’équipes”, Cahier des charges Ligue LDP et PLSJQ — Saison 2025, and the instructions supplied by the guide owner. Three original screenshots were extracted from the supplied Word document without changing their contents. English explanations retain the French UI labels shown in the screenshots. Portal appearance may have changed since the screenshots were taken.

Short name: club name only (required). Full team name: club + category + league + gender (recommended). The historical SOCCER QUEBEC U15 LDP F example is illustrative.

This guide covers creating and saving a team, not entering a competition, paying fees or obtaining roster approval. No live portal team was created during authoring.

## Maintain

Edit both languages in guide-data.js and UI translations in app.js. Use a new asset version in index.html when publishing script or stylesheet changes. Change the localStorage namespace when the checklist steps change so old progress does not apply to a new process.

## Deploy

Push to main to publish via the existing GitHub Pages workflow. French default: ?lang=fr&competition=lspro. English: ?lang=en&competition=cups. Old competition aliases remain supported.

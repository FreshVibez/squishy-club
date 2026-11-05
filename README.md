# Squishy Club

A pink playground with six moldable squishies and recorded squish/crunch sounds.

[Open the website on GitHub Pages](https://freshvibez.github.io/squishy-club/)

## Run locally

No installation or build step is needed. From the repository root:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173. Drag a squishy to mold it, click or press Space to squeeze, and use Reset shape to restore it. Arrow keys also stretch the selected toy. Choose Squishy or Crunchy for the sound texture, or mute audio.

## Files

- `dist/index.html`: page structure
- `dist/style.css`: styling and responsive layout
- `dist/app.js`: canvas deformation and Web Audio playback
- `dist/audio/`: six edited Foley clips and source credits
- `.openai/hosting.json`: original Sites hosting configuration

## Hosting

GitHub Pages publishes the root of the `gh-pages` branch over HTTPS. That branch contains the contents of `dist/`, plus `.nojekyll`. To publish changes, update the source on `main` and copy the updated `dist/` contents to the root of `gh-pages`.

The original [Sites deployment](https://squishy-club-pink-playground.tawnypecan.chatgpt.site) is also available and is managed separately.

## Audio credits

The clips use CC0 recordings by qubodup and mealwyrm. See [audio credits](dist/audio/CREDITS.md) for sources and processing details.

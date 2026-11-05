# Squishy Club

A pink playground with six moldable squishies and recorded squish/crunch sounds.

[Open the website](https://squishy-club-pink-playground.tawnypecan.chatgpt.site)

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
- `.openai/hosting.json`: existing Sites hosting configuration

The live website is hosted on Sites. This repository contains its source; pushing to this GitHub repository does not automatically update the Sites deployment.

## Audio credits

The clips use CC0 recordings by qubodup and mealwyrm. See [audio credits](dist/audio/CREDITS.md) for sources and processing details.

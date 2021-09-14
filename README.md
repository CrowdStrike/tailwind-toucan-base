# @crowdstrike/tailwind-toucan-base

A Tailwind preset that provides Toucan styles.

## Usage

```bash
yarn add @crowdstrike/tailwind-toucan-base
#
npm install @crowdstrike/tailwind-toucan-base
```

### Tailwind

```js
// tailwind.config.js

module.exports = {
  presets: [require('@crowdstrike/tailwind-toucan-base')],
  extends: {
    // your customizations here
  }
};
```

### Ember

The package `@crowdstrike/ember-toucan-styles` provides helpers for configuring
your ember projects to integrate PostCSS (or optionally CSS Modules), Tailwind,
and the Toucan preset.

See the README for in `@crowdstrike/ember-toucan-styles` for details.

## Importing colors and shadows from Figma

This addon provides the ability to pull our palette information directly from Figma files and store them in
`themes.json` which is used by the Tailwind configuration to set up our CSS.

To import the colors run:

```bash
LIGHT_ID=fileId DARK_ID=fileId MEZZANINE_ID=fileId \
  FIGMA_TOKEN=some-key yarn figma:export-styles
```

- `FIGMA_TOKEN` here is figma [Personal Access Token](https://www.figma.com/developers/api#access-tokens).
- `LIGHT_ID`, `DARK_ID`, and `MEZZANINE_ID` are `fileId`s that can be obtained from the URL of the figma project containing the color tokens.

...and commit the changes to `themes.json`.

If you see any errors reported then you _may_ need to ensure that the Figma file is set up correctly (and e.g.
there are corresponding colors across each of the palettes).

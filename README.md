# @crowdstrike/tailwind-toucan-base

A Tailwind preset that provides the base styles for CrowdStrike's Toucan design system.

## Usage

```bash
yarn add @crowdstrike/tailwind-toucan-base
#
npm install @crowdstrike/tailwind-toucan-base
#
pnpm add @crowdstrike/tailwind-toucan-base
```

### Tailwind

_Note_: This preset is presently only tested with Tailwind v2

```js
// tailwind.config.js

module.exports = {
  presets: [require('@crowdstrike/tailwind-toucan-base')],
  extends: {
    // your customizations here
  }
};
```

### CSS `@import`

If your packager supports importing styles directly from an npm package, the Toucan styles are pre-built and can be imported at:

```css
@import "@crowdstrike/tailwind-toucan-base";
```

### CDN Usage

Many JS CDNs scrape NPM and automatically serve and cache assets
deployed to NPM.

Here as an example with JSDelivr
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crowdstrike/tailwind-toucan-base/toucan.css">
```

## Previewing the config locally

```bash
pnpm start
```
which is an alias for:

```bash
pnpm run build:preview
npx http-server ./dist
```

Note that changes to `src` or `build` scripts will require re-running `pnpm start`.

## Previewing manual tests locally

```bash
pnpm build
```

then, open the `manual-test.html`
```bash
firefox ./manual-test.html
```

Or, along with the tailwind-preview
```bash
pnpm start
```

and visit `http://localhost:8080/manual`

## Importing colors and shadows from Figma

This addon provides the ability to pull our palette information directly from Figma files and store them in
`themes.json` which is used by the Tailwind configuration to set up our CSS.

To import the colors run:

```bash
FIGMA_TOKEN=some-key \
LIGHT_ID=fileId \
DARK_ID=fileId \
MEZZANINE_ID=fileId \
  pnpm run figma:export-styles
```

- `FIGMA_TOKEN` here is figma [Personal Access Token](https://www.figma.com/developers/api#access-tokens).
- `LIGHT_ID`, `DARK_ID`, and `MEZZANINE_ID` are `fileId`s that can be obtained from the URL of the figma project containing the color tokens.

...and commit the changes to `themes.json`.

If you see any errors reported then you _may_ need to ensure that the Figma file is set up correctly (and e.g.
there are corresponding colors across each of the palettes).

If there are resulting changes to the output, you'll need to update the test snapshots.
That can be done via `pnpm exec vitest --update`

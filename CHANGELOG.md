## 4.1.0

## 4.4.0

### Minor Changes

- [#369](https://github.com/CrowdStrike/tailwind-toucan-base/pull/369) [`0f857b9`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/0f857b9df842636ed035e431732b4c388bb66679) Thanks [@JackRobards](https://github.com/JackRobards)! - Add new Chart specific color palette

## 4.3.0

### Minor Changes

- [#340](https://github.com/CrowdStrike/tailwind-toucan-base/pull/340) [`50bbbe3`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/50bbbe3f26cfe6aec85170597940e875c42a33d7) Thanks [@patriciacarbajal](https://github.com/patriciacarbajal)! - Updated graph-7 and graph-8 colors

## 4.2.0

### Minor Changes

- [#331](https://github.com/CrowdStrike/tailwind-toucan-base/pull/331) [`d257b39`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/d257b393c6eafa5866abceafca873b1ebcec64e7) Thanks [@haileymeister00](https://github.com/haileymeister00)! - Add new neutral hue color to light and dark themes

### Minor Changes

- [#326](https://github.com/CrowdStrike/tailwind-toucan-base/pull/326) [`bcc8b10`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/bcc8b10e11e8756b517f6c975ffce7009d217d31) Thanks [@JackRobards](https://github.com/JackRobards)! - Add new background and surface related colors

## 4.0.0

### Major Changes

- [#294](https://github.com/CrowdStrike/tailwind-toucan-base/pull/294) [`60e5d86`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/60e5d86611635a6b093e1d1f859fe7c1f6a37a36) Thanks [@joelamb](https://github.com/joelamb)! - possibly breaking change that sets all type style properties explicitly,
  which could cause subtle, but unexpected, changes in the weight of rendered
  text if inherited parent styles are no longer applied.

## 3.5.1

### Patch Changes

- [#254](https://github.com/CrowdStrike/tailwind-toucan-base/pull/254) [`e8c01b1`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/e8c01b1716c660c17c45e879564ea50d0ee9fddc) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Moved changeset dependencies from `dependencies` to `devDependencies` as they were added there by accident.

## 3.5.0

### Minor Changes

- [#234](https://github.com/CrowdStrike/tailwind-toucan-base/pull/234) [`8998c90`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/8998c906135cb8da970a358c3a97f08daf04f817) Thanks [@ynotdraw](https://github.com/ynotdraw)! - Added a new "read-only-outline" box-shadow to help build read-only form elements.

### Patch Changes

- [#218](https://github.com/CrowdStrike/tailwind-toucan-base/pull/218) [`c98f38a`](https://github.com/CrowdStrike/tailwind-toucan-base/commit/c98f38ab171f96baaf1bfa4b1560db7d4f2c9644) Thanks [@ynotdraw](https://github.com/ynotdraw)! - (internal): swap semantic-release for Changesets so that we can have more granular control over releases, and batch breaking changes together without massive PRs

# [3.4.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.3.1...v3.4.0) (2023-03-20)

### Features

- Add error-focus-outline shadow ([e0a748a](https://github.com/CrowdStrike/tailwind-toucan-base/commit/e0a748a4e98d54df8be1f02708bdfb1b50c2842e))

## [3.3.1](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.3.0...v3.3.1) (2022-09-27)

### Bug Fixes

- **#182:** remove darkMode from config ([cdecd50](https://github.com/CrowdStrike/tailwind-toucan-base/commit/cdecd5091b18676d5ab84824882a8a48450a2602)), closes [#182](https://github.com/CrowdStrike/tailwind-toucan-base/issues/182)

# [3.3.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.2.1...v3.3.0) (2022-07-13)

### Features

- Add new zIndex for overlay-loader ([4d46b94](https://github.com/CrowdStrike/tailwind-toucan-base/commit/4d46b9408a0f3461ec998476f4e718dc55a8f2c6))

## [3.2.1](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.2.0...v3.2.1) (2022-07-10)

### Bug Fixes

- **types:** add types tests and assure that this library works with TS ([885fabf](https://github.com/CrowdStrike/tailwind-toucan-base/commit/885fabf41f966a8bacf22ffb7026d4321973d7a9))

# [3.2.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.1.1...v3.2.0) (2022-07-06)

### Features

- **types:** add looser type utilities for working with theme-data ([3f67ae8](https://github.com/CrowdStrike/tailwind-toucan-base/commit/3f67ae81dd0c646b510877f8b02c315249fe41ab))

## [3.1.1](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.1.0...v3.1.1) (2022-06-08)

### Bug Fixes

- **package:** run build on prepublishOnly ([7a3b5b5](https://github.com/CrowdStrike/tailwind-toucan-base/commit/7a3b5b56982a56f86fff99582235513312388658))

# [3.1.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.5...v3.1.0) (2022-06-08)

### Features

- build theme-data and type-declarations ([42d4cab](https://github.com/CrowdStrike/tailwind-toucan-base/commit/42d4cabec40a3603004759b69f39ce673d930b12))

## [3.0.5](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.4...v3.0.5) (2022-05-25)

### Bug Fixes

- **package:** remove devDep from dependencies ([b9109cd](https://github.com/CrowdStrike/tailwind-toucan-base/commit/b9109cda4985fef70ce50acb2c3bb4b3a81dcce8))

## [3.0.4](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.3...v3.0.4) (2022-05-20)

### Bug Fixes

- **npm:** publish themes.json in npm package ([85fb038](https://github.com/CrowdStrike/tailwind-toucan-base/commit/85fb038edb93f9771692648bc3d5a44b5c5e8a19))

## [3.0.3](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.2...v3.0.3) (2022-05-20)

### Bug Fixes

- **graphs:** re-assign graph colors to 'data-visualization' ([824549c](https://github.com/CrowdStrike/tailwind-toucan-base/commit/824549c3fc50f0a82ca313d7556a33fbb2b8aa82))

## [3.0.2](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.1...v3.0.2) (2022-05-19)

### Bug Fixes

- themes.json must specify the extension when used as package ([65d7b0f](https://github.com/CrowdStrike/tailwind-toucan-base/commit/65d7b0f2c13a3a1d4477a27bccd11fbc2d803811))

## [3.0.1](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v3.0.0...v3.0.1) (2022-05-17)

### Bug Fixes

- **npm:** flip publishConfig.access to public ([ca78e9e](https://github.com/CrowdStrike/tailwind-toucan-base/commit/ca78e9e75c9ba3e46581b947703c94acbc01356e))

# [3.0.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v2.0.0...v3.0.0) (2022-05-17)

### chore

- **npm:** flip "private" to false ([aacdb8b](https://github.com/CrowdStrike/tailwind-toucan-base/commit/aacdb8b6e5d7b03be3dde2b78d15d695195add1c))

### BREAKING CHANGES

- **npm:** publishing package to npm for the first time

# [2.0.0](https://github.com/CrowdStrike/tailwind-toucan-base/compare/v1.0.0...v2.0.0) (2022-05-17)

### chore

- force version bump ([e0c1df4](https://github.com/CrowdStrike/tailwind-toucan-base/commit/e0c1df4bdc6e662cd8d472137acfa2df141738ef))

### BREAKING CHANGES

- forcing version bump

# 1.0.0 (2022-05-17)

### chore

- sync version with internal ([5f08e21](https://github.com/CrowdStrike/tailwind-toucan-base/commit/5f08e216af47feefeae203d9639f6aad365e7723))

### Features

- **preview:** add tailwind-config-viewer ([dc36b93](https://github.com/CrowdStrike/tailwind-toucan-base/commit/dc36b934be74ebcbb553c1a07a1230fc74893592))
- prepare for initial public release ([635c007](https://github.com/CrowdStrike/tailwind-toucan-base/commit/635c007682d5b3e70857cbf0ba366d65c9bc7807))

### BREAKING CHANGES

- version sync, public release must be next major
- initial release prep

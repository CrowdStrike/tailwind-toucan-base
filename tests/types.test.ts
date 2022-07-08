import { type ColorInfo } from '@crowdstrike/tailwind-toucan-base/theme-data';
import { expectType } from 'ts-expect';
import { test } from 'vitest';

import type themeData from '@crowdstrike/tailwind-toucan-base/theme-data';
import type theme from '@crowdstrike/tailwind-toucan-base/themes';
import type themeJson from '@crowdstrike/tailwind-toucan-base/themes.json';
import type { TypeEqual, TypeOf } from 'ts-expect';

test('Type Checking', () => {
  // Equality between paths' types
  expectType<TypeEqual<theme, themeJson>>(true);
  expectType<TypeEqual<theme, typeof themeData>>(true);
  expectType<TypeEqual<themeJson, typeof themeData>>(true);

  // The Correct themes exist
  expectType<TypeOf<keyof typeof themeData['themes'], 'dark'>>(true);
  expectType<TypeOf<keyof typeof themeData['themes'], 'light'>>(true);
  expectType<TypeOf<keyof typeof themeData['themes'], 'mezzanine'>>(true);

  // Utility type is sufficient
  expectType<TypeEqual<string, ColorInfo['rgbFill']>>(true);

  // ColorInfo is sufficient for all more-specific-versions of the type
  expectType<TypeOf<ColorInfo, typeof themeData['themes']['dark']['colors'][number]>>(true);
  expectType<TypeOf<ColorInfo, typeof themeData['themes']['light']['colors'][number]>>(true);
  expectType<TypeOf<ColorInfo, typeof themeData['themes']['mezzanine']['colors'][number]>>(true);
});

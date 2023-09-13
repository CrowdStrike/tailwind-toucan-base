import { describe, expect, test } from 'vitest';

describe('JS Imports', () => {
  describe('declared exports can be imported', () => {
    test('.', async () => {
      let result = await import('@crowdstrike/tailwind-toucan-base');

      expect(result?.theme).toBeTruthy();
    });

    test('./themes', async () => {
      let result = await import('@crowdstrike/tailwind-toucan-base/themes');

      expect(result?.themes?.dark).toBeTruthy();
    });

    test('./themes.json', async () => {
      let result = await import('@crowdstrike/tailwind-toucan-base/themes.json');

      expect(result?.themes?.dark).toBeTruthy();
    });

    test('./theme-data', async () => {
      // This file is auto-generated, and may not exist when linting
      //eslint-disable-next-line n/no-missing-import
      let result = await import('@crowdstrike/tailwind-toucan-base/theme-data');

      expect(result?.default.themes?.dark).toBeTruthy();
    });
  });
});

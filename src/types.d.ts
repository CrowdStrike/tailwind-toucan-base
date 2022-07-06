/**
 * Generic loosley typed version of the strict types provided by
 * ```ts
 * import type ThemeData from '@crowdstrike/tailwind-toucan-base/theme-data';
 * ```
 */
export interface ColorInfo {
  category: string[];
  hasAlpha: boolean;
  rgbFill: string;
  fill: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  name: string;
  value: string;
}

/**
 * Generic loosley typed version of the strict types provided by
 * ```ts
 * import type ThemeData from '@crowdstrike/tailwind-toucan-base/theme-data';
 * ```
 */
export interface Theme {
  colors: ColorInfo[];
  cssSelector: string;
  shadows: Array<{
    name: string;
    effects: string[];
  }>;
}

/**
 * Generic loosley typed version of the strict types provided by
 * ```ts
 * import type ThemeData from '@crowdstrike/tailwind-toucan-base/theme-data';
 * ```
 */
export interface ThemeData {
  aliases: { name: string; value: string }[];
  themes: {
    dark: Theme;
    light: Theme;
  };
}

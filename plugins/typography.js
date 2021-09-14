'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = (fontSizes) =>
  plugin((pluginApi) => {
    addTextStyles(pluginApi, fontSizes);
  });

function addTextStyles({ addComponents, theme }, fontSize) {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
  let geometricPrecision = { textRendering: 'geometricPrecision' };
  let underline = { textDecoration: 'underline' };

  let text = {
    '.geometric-precision-text': {
      ...geometricPrecision,
    },
  };

  /**
   * NOTE:
   * We cannot use theme('fontSize.XY') for everything because it contains both
   * fontSize and lineHeight when used in this type of object, every usage
   * provides *two* fontSizes (one desired, one is supposed to be the lineHeight,
   * but is interpreted as a fontSize here).
   */
  let textStyles = {
    '.type-4xl': {
      fontSize: fontSize['4xl'],
      lineHeight: theme('lineHeight.13'),
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
    },
    '.type-3xl': {
      fontSize: fontSize['3xl'],
      lineHeight: theme('lineHeight.12'),
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
    },
    '.type-2xl': {
      fontSize: fontSize['2xl'],
      lineHeight: theme('lineHeight.10'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.type-xl': {
      fontSize: fontSize.xl,
      lineHeight: theme('lineHeight.8'),
      fontWeight: theme('fontWeight.medium'),
      ...geometricPrecision,
    },
    '.type-lg': {
      fontSize: fontSize.lg,
      lineHeight: theme('lineHeight.8'),
    },
    '.type-lg-medium': {
      fontSize: fontSize.lg,
      lineHeight: theme('lineHeight.8'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.type-lg-tight-medium': {
      fontSize: fontSize.lg,
      lineHeight: theme('lineHeight.6'),
      fontWeight: theme('fontWeight.medium'),
      ...geometricPrecision,
    },
    '.type-md': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.6'),
    },
    // deprecated? md-medium?
    '.type-md-medium': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.6'),
      fontWeight: theme('fontWeight.medium'),
    },
    '.type-md-underline': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.6'),
      ...underline,
    },
    '.type-md-tight': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.5'),
    },
    '.type-md-tight-medium': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.5'),
      fontWeight: theme('fontWeight.medium'),
      ...geometricPrecision,
    },
    '.type-md-tight-underline': {
      fontSize: fontSize.md,
      lineHeight: theme('lineHeight.5'),
      ...underline,
    },
    '.type-sm-mono': {
      fontSize: fontSize.sm,
      lineHeight: theme('lineHeight.6'),
      fontFamily: theme('fontFamily.mono'),
    },
    '.type-sm-mono-tight': {
      fontSize: fontSize.sm,
      fontFamily: theme('fontFamily.mono'),
      lineHeight: theme('lineHeight.5'),
    },
    '.type-sm-mono-underline': {
      fontSize: fontSize.sm,
      lineHeight: theme('lineHeight.6'),
      fontFamily: theme('fontFamily.mono'),
      ...underline,
    },
    '.type-xs': {
      fontSize: fontSize.xs,
      lineHeight: theme('lineHeight.5'),
    },
    '.type-xs-tight': {
      fontSize: fontSize.xs,
      lineHeight: theme('lineHeight.4'),
    },
    '.type-xs-tight-underline': {
      fontSize: fontSize.xs,
      lineHeight: theme('lineHeight.4'),
      ...underline,
    },
    '.type-xs-mono': {
      fontSize: fontSize.xs,
      lineHeight: theme('lineHeight.5'),
      fontFamily: theme('fontFamily.mono'),
    },
    '.type-xxs-mono': {
      fontSize: fontSize.xxs,
      lineHeight: theme('lineHeight.5'),
      fontFamily: theme('fontFamily.mono'),
    },
  };

  addComponents(textStyles);
  addComponents(text);
}

'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = (fontSizes) =>
  plugin((pluginApi) => {
    addTextStyles(pluginApi, fontSizes);
  });

function addTextStyles({ addComponents, theme }, fontSize) {
  // geometricPrecision text rendering makes it appear slightly
  // lighter than the standard font-weight
  let text = {
    '.geometric-precision-text': {
      textRendering: 'geometricPrecision',
    },
  };

  /**
   * NOTE:
   * We cannot use theme('fontSize.XY') for everything because it contains both
   * fontSize and lineHeight when used in this type of object, every usage
   * provides *two* fontSizes (one desired, one is supposed to be the lineHeight,
   * but is interpreted as a fontSize here).
   *
   * We use the `initial` value to unset values that might be otherwise
   * inherited from parent elements eg. textRendering, textDecoration
   */
  let textStyles = {
    '.type-4xl': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize['4xl'],
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
      lineHeight: theme('lineHeight.13'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-3xl': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize['3xl'],
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.tight'),
      lineHeight: theme('lineHeight.12'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-2xl': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize['2xl'],
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.10'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-xl': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.xl,
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.8'),
      textDecoration: 'initial',
      textRendering: 'geometricPrecision',
    },
    '.type-lg': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.lg,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.8'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-lg-medium': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.lg,
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.8'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-lg-tight-medium': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.lg,
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'initial',
      textRendering: 'geometricPrecision',
    },
    '.type-md': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    // deprecated? md-medium?
    '.type-md-medium': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-md-underline': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'underline',
      textRendering: 'initial',
    },
    '.type-md-tight': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.5'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-md-tight-medium': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.medium'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.5'),
      textDecoration: 'initial',
      textRendering: 'geometricPrecision',
    },
    '.type-md-tight-underline': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.md,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.5'),
      textDecoration: 'underline',
      textRendering: 'initial',
    },
    '.type-sm-mono': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: fontSize.sm,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-sm-mono-tight': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: fontSize.sm,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.5'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-sm-mono-underline': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: fontSize.sm,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'underline',
      textRendering: 'initial',
    },
    '.type-xs': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.xs,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.5'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-xs-tight': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.xs,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.4'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-xs-tight-underline': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: fontSize.xs,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.4'),
      textDecoration: 'underline',
      textRendering: 'initial',
    },
    '.type-xs-mono': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: fontSize.xs,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.6'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
    '.type-xxs-mono': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: fontSize.xxs,
      fontWeight: theme('fontWeight.normal'),
      letterSpacing: theme('letterSpacing.normal'),
      lineHeight: theme('lineHeight.4'),
      textDecoration: 'initial',
      textRendering: 'initial',
    },
  };

  addComponents(textStyles);
  addComponents(text);
}

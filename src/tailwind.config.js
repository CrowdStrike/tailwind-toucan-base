'use strict';

const themesData = require('./themes.json');

let colors = themesData.themes['dark'].colors.reduce((acc, { name }) => {
  acc[name.replace('\\.', '.')] = `var(--${name})`;

  return acc;
}, {});

let boxShadow = themesData.themes['dark'].shadows.reduce((acc, { name }) => {
  acc[name.replace(/^elevation-/, '')] = `var(--${name})`;

  return acc;
}, {});

const FONT_SIZES = {
  xxs: '.5625rem',
  xs: '.75rem',
  sm: '.875rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '2.5rem',
  '4xl': '3rem',
};

module.exports = {
  theme: {
    // Keys placed here will REMOVE the classes included with tailwindcss
    // eg if `padding` was added here we would lose all of tailwinds padding classes.
    // If you want to ADD a custom class then place them in the `extend` object below
    boxShadow: {
      none: 'none',
      'focusable-outline': 'inset 0 0 0 1px var(--lines-dark), var(--elevation-inner-md)',
      'focus-outline': 'inset 0 0 0 2px var(--focus)',
      'error-outline': 'inset 0 0 0 2px var(--critical)',
      'search-input': 'inset 0 0 0 1px var(--nav-text-secondary)',
      ...boxShadow,
    },

    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      falcon: 'var(--falcon)',
      ...colors,
    },

    fontFamily: {
      sans: ['Calibre', 'sans-serif'],
      mono: ['Monaco', 'monospace'],
    },

    fontSize: (theme) => {
      return {
        xxs: [FONT_SIZES.xxs, theme('lineHeight.4')],
        xs: [FONT_SIZES.xs, theme('lineHeight.5')],
        sm: [FONT_SIZES.sm, theme('lineHeight.6')],
        md: [FONT_SIZES.md, theme('lineHeight.6')],
        lg: [FONT_SIZES.lg, theme('lineHeight.8')],
        xl: [FONT_SIZES.xl, theme('lineHeight.8')],
        '2xl': [FONT_SIZES['2xl'], theme('lineHeight.10')],
        '3xl': [FONT_SIZES['3xl'], theme('lineHeight.12')],
        '4xl': [FONT_SIZES['4xl'], theme('lineHeight.13')],
      };
    },

    zIndex: {
      '-1': '-1',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      'flash-messages': 'var(--z-index-flash-messages)',
      overlay: 'var(--z-index-overlay)',
      tooltip: 'var(--z-index-tooltip)',
      'popover-sticky': 'var(--z-index-popover-sticky)',
      popover: 'var(--z-index-popover)',
      'skip-to-content': 'var(--z-index-skip-to-content)',
      tablist: 'var(--z-index-tablist)',
      tabpanel: 'var(--z-index-tabpanel)',
      'tabpanel-scrim': 'var(--z-index-tabpanel-scrim)',
      'template-head': 'var(--z-index-template-head)',
      'template-main-head-sticky': 'var(--z-index-template-main-head-sticky)',
      'template-main-head': 'var(--z-index-template-main-head)',
      'template-main': 'var(--z-index-template-main)',
      'search-results-navigation': 'var(--z-index-navigation-search)',
    },

    extend: {
      animation: {
        'fade-in': 'fade-in .25s linear',
      },

      cursor: {
        'col-resize': 'col-resize',
      },

      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },

      gridTemplateColumns: {
        'centered-2/3': '2fr 8fr 2fr',

        'auto-2': 'auto auto',

        'max-content-4': 'repeat(4, minmax(max-content, 1fr))',
        'max-content-6': 'repeat(6, minmax(max-content, 1fr))',
      },

      height: {
        2.5: '0.375rem',
        7: '1.75rem',
        9: '2.25rem',
        11: '2.75rem',
        'main-content-area': 'calc(100vh - var(--template-head-height))',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },

      rotate: {
        '-5': '-5deg',
      },

      inset: {
        '1/2': '50%',
      },

      lineHeight: {
        12: '3rem',
        13: '3.25rem',
      },

      maxHeight: {
        listbox: '12em',
        'under-header': 'calc(100vh - var(--template-head-height))',
      },

      maxWidth: {
        paragraph: '34rem',
      },

      minHeight: (theme) => {
        return {
          3: theme('height.3'),
          4: theme('height.4'),
          6: theme('height.6'),
          16: theme('height.16'),
        };
      },

      minWidth: (theme) => {
        return {
          3: theme('width.3'),
          4: theme('width.4'),
          6: theme('width.6'),
          16: theme('width.16'),
          24: theme('width.24'),
          48: theme('width.48'),
          phoenix: '1024px',
          popover: '140px',
          toucan: '1380px',
        };
      },

      padding: {
        0.25: '0.063rem',
        'property-tabs-top': 'var(--property-tabs-top)',
        unset: 'unset',
      },

      spacing: {
        0.5: '0.125rem',
      },

      transitionProperty: {
        width: 'width',
      },

      width: {
        2.5: '0.375rem',
        'max-content': 'max-content',
        7: '1.75rem',
        15: '3.75rem',
      },
    },

    screens: {
      print: { raw: 'print' },

      // Defaults omitted to reduce payload size,
      // sm: md: lg: variants removed to reduce file size by ~700kb
      // https://tailwindcss.com/docs/theme/#screens
      //
      // Now, we add the screens we only need for specific properties
      lg: '1120px',
      '2xl': '1536px',
    },
  },

  variants: {
    // defaults
    // https://tailwindcss.com/docs/pseudo-class-variants/#default-variants-reference
    // **** NOTE *****
    // Order of variants passed here controls order in source code. You almost certainly
    // want active and disabled at the end so they can override other styles!
    accessibility: ['focus'],
    alignContent: [],
    alignItems: [],
    alignSelf: [],
    animation: [],
    appearance: [],
    backdropBlur: [],
    backdropBrightness: [],
    backdropContrast: [],
    backdropDropShadow: [],
    backdropFilter: [],
    backdropGrayscale: [],
    backdropHueRotate: [],
    backdropInvert: [],
    backdropSaturate: [],
    backdropSepia: [],
    backgroundAttachment: [],
    backgroundBlendMode: [],
    backgroundClip: [],
    backgroundColor: [
      'even',
      'group-hover',
      'hover',
      'focus',
      'focus-within',
      'focus-visible',
      'active',
      'disabled',
    ],
    backgroundImage: [],
    backgroundOpacity: ['hover', 'focus'],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    blur: [],
    borderCollapse: [],
    borderColor: ['hover', 'active'],
    borderOpacity: ['hover', 'focus'],
    borderRadius: ['focus', 'first', 'last'],
    borderStyle: [],
    borderWidth: ['first', 'last', 'active'],
    boxDecorationBreak: [],
    boxShadow: [
      'hover',
      'group-hover',
      'focus',
      'focus-within',
      'focus-visible',
      'active',
      'disabled',
    ],
    boxSizing: [],
    brightness: [],
    clear: [],
    container: [],
    contrast: [],
    cursor: ['disabled'],
    display: ['responsive', 'group-hover'],
    divideColor: [],
    divideOpacity: [],
    divideStyle: [],
    divideWidth: [],
    dropShadow: [],
    fill: [],
    filter: [],
    flex: [],
    flexDirection: [],
    flexGrow: [],
    flexShrink: [],
    flexWrap: [],
    float: [],
    fontFamily: [],
    fontSize: [],
    fontSmoothing: [],
    fontStyle: [],
    fontVariantNumeric: [],
    fontWeight: ['hover', 'focus'],
    gap: [],
    gradientColorStops: ['dark', 'hover', 'focus'],
    grayscale: [],
    gridAutoColumns: [],
    gridAutoFlow: [],
    gridAutoRows: [],
    gridColumn: [],
    gridColumnEnd: [],
    gridColumnStart: [],
    gridRow: [],
    gridRowEnd: [],
    gridRowStart: [],
    gridTemplateColumns: ['responsive'],
    gridTemplateRows: [],
    height: [],
    hueRotate: [],
    inset: ['focus'],
    invert: [],
    isolation: [],
    justifyContent: [],
    justifyItems: [],
    justifySelf: [],
    letterSpacing: [],
    lineHeight: [],
    listStylePosition: [],
    listStyleType: [],
    margin: ['first', 'last'],
    maxHeight: [],
    maxWidth: [],
    minHeight: [],
    minWidth: [],
    mixBlendMode: [],
    objectFit: [],
    objectPosition: [],
    opacity: ['hover', 'focus', 'group-hover', 'group-focus'],
    order: [],
    outline: ['focus'],
    overflow: [],
    overscrollBehavior: [],
    padding: [],
    placeItems: [],
    placeContent: [],
    placeSelf: [],
    placeholderColor: ['focus'],
    placeholderOpacity: ['focus'],
    pointerEvents: ['disabled'],
    position: ['hover'],
    resize: [],
    ringColor: ['dark', 'focus-within', 'focus'],
    ringOffsetColor: ['dark', 'focus-within', 'focus'],
    ringOffsetWidth: ['focus-within', 'focus'],
    ringOpacity: ['dark', 'focus-within', 'focus'],
    ringWidth: ['focus-within', 'focus-visible', 'focus'],
    rotate: ['active'],
    saturate: [],
    scale: ['hover', 'focus', 'active'],
    sepia: [],
    skew: ['hover', 'focus'],
    space: [],
    stroke: [],
    strokeWidth: [],
    tableLayout: [],
    textAlign: [],
    textColor: ['hover', 'focus', 'focus-visible', 'group-hover', 'active', 'disabled'],
    textDecoration: ['hover', 'focus'],
    textOpacity: ['hover', 'focus'],
    textOverflow: [],
    textTransform: [],
    transform: [],
    transformOrigin: [],
    transitionDelay: [],
    transitionDuration: [],
    transitionProperty: ['active'],
    transitionTimingFunction: [],
    translate: ['hover', 'focus'],
    userSelect: [],
    verticalAlign: [],
    visibility: [],
    whitespace: [],
    width: [],
    wordBreak: [],
    zIndex: ['hover', 'active', 'group-hover'],
  },

  plugins: [
    /**
     * All of our own custom plugins are wrapped up this single
     * configure call -- form fields, variables, etc
     */
    ...require('./plugins').configure({ FONT_SIZES, themesData }),
  ],
};

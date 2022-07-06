'use strict';

module.exports = {
  presets: [require('../../src/tailwind.config')],
  darkMode: false,

  theme: {
    configViewer: {
      typographyExample: 'The quick brown fox jumped over the lazy dog.',
    },
  },
};

'use strict';

const plugin = require('tailwindcss/plugin');

const FALCON_VARIBALES = {
  '--side-nav-width-collapsed': '122px',
  '--side-nav-width-expanded': '247px',

  '--tab-list-height': '40px',
  '--tab-height': '40px',
  '--tab-border-radius': '8px',

  '--process-offset-top': '40px',

  '--default-animation-duration': '125ms',
  '--default-animation-timing-function': 'ease-out',

  '--default-animation-settings':
    'var(--default-animation-duration) var(--default-animation-timing-function)',
};

module.exports = plugin(function ({ addComponents, theme }) {
  let roots = {};

  // See: https://tailwindcss.com/docs/margin/#app
  //      for values
  let space = theme(`space`);

  if (!space) {
    throw new Error('TailwindCSS 1.9.6 or greater is required');
  }

  for (let [specifier, amount] of Object.entries(space)) {
    let varName = `--space-${specifier}`;

    roots[varName] = amount;
  }

  addComponents({
    ':root': {
      ...roots,
      ...FALCON_VARIBALES,
    },
  });
});

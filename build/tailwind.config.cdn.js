'use strict';

module.exports = {
  presets: [require('../src/tailwind.config')],
  content: [{ raw: ' ' }],
  safelist: [
    {
      pattern: /.*/,
      variants: [
        'hover',
        'focus',
        'focus-within',
        'focus-visible',
        'active',
        'disabled',
        'group-hover',
        'group-focus',
        'first',
        'last',
        'even',
        'dark',
        'lg',
        'print',
      ],
    },
  ],
};

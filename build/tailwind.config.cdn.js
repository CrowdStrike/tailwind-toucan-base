'use strict';

module.exports = {
  presets: [require('../src/tailwind.config')],
  purge: {
    content: [],
    enabled: false,
  },
};

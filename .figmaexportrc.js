'use strict';

const { DARK_ID, LIGHT_ID, MEZZANINE_ID } = process.env;

module.exports = {
  commands: [
    [
      'styles',
      {
        fileId: DARK_ID, // Colors - Dark
        outputters: [
          require('./lib/styles-outputter')({
            theme: 'dark',
            output: './themes.json',
          }),
        ],
      },
    ],
    [
      'styles',
      {
        fileId: LIGHT_ID, // Colors - Light
        outputters: [
          require('./lib/styles-outputter')({
            theme: 'light',
            output: './themes.json',
          }),
        ],
      },
    ],
    [
      'styles',
      {
        fileId: MEZZANINE_ID, // Colors - Mezzanine
        outputters: [
          require('./lib/styles-outputter')({
            folderPrefix: 'mezzanine/',
            theme: 'mezzanine',
            output: './themes.json',
          }),
        ],
      },
    ],
  ],
};

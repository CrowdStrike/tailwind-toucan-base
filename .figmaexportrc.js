'use strict';

const { DARK_ID, LIGHT_ID, MEZZANINE_ID } = process.env;

module.exports = {
  commands: [
    [
      'styles',
      {
        fileId: DARK_ID, // Colors - Dark
        outputters: [
          require('./build/theme-json/figma-export')({
            theme: 'dark',
            output: './src/themes.json',
          }),
        ],
      },
    ],
    [
      'styles',
      {
        fileId: LIGHT_ID, // Colors - Light
        outputters: [
          require('./build/theme-json/figma-export')({
            theme: 'light',
            output: './src/themes.json',
          }),
        ],
      },
    ],
    [
      'styles',
      {
        fileId: MEZZANINE_ID, // Colors - Mezzanine
        outputters: [
          require('./build/theme-json/figma-export')({
            folderPrefix: 'mezzanine/',
            theme: 'mezzanine',
            output: './src/themes.json',
          }),
        ],
      },
    ],
  ],
};

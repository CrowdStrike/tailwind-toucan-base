'use strict';

const fs = require('fs');
const { grabColors, prepareColorsForJson } = require('./styles-outputter/colors');
const { grabShadows } = require('./styles-outputter/shadows');
const { validateTheme } = require('./styles-outputter/validation');

module.exports = ({ folderPrefix, output, theme }) => {
  return async (styles) => {
    let themesJson = JSON.parse(fs.readFileSync(output, 'utf8'));

    if (folderPrefix === undefined) {
      folderPrefix = `${theme}mode/`;
    }

    let colors = grabColors({ folderPrefix, styles });

    themesJson.themes[theme].colors = prepareColorsForJson(colors);
    themesJson.themes[theme].shadows = grabShadows({ folderPrefix, styles });

    switch (theme) {
      case 'light':
        validateTheme(themesJson, 'light', 'dark');
        validateTheme(themesJson, 'dark', 'light');

        break;

      case 'mezzanine':
        validateTheme(themesJson, 'dark', 'mezzanine');
    }

    let outputJson = JSON.stringify(themesJson, null, 2);

    fs.writeFileSync(output, outputJson, { encoding: 'utf8' });
  };
};

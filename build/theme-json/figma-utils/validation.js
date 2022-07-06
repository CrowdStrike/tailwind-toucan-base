'use strict';

function validateTheme(themesJson, themeSource, themeTarget) {
  let sourceColors = themesJson.themes[themeSource].colors.reduce((acc, colorInfo) => {
    acc[colorInfo.name] = true;

    return acc;
  }, {});

  let targetColors = themesJson.themes[themeTarget].colors;

  targetColors.forEach((colorInfo) => {
    if (!sourceColors[colorInfo.name]) {
      throw new Error(
        `Swatch '${colorInfo.name}' in the '${themeTarget}' theme but missing from the '${themeSource}' theme`
      );
    }
  });
}

module.exports = {
  validateTheme,
};

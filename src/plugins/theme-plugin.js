'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = function (themesData) {
  const addThemeColorClasses = ({ addComponents }) => {
    let generatedCss = Object.entries(themesData.themes).reduce((css, [, themeData]) => {
      css[themeData.cssSelector] = themeData.colors.reduce((acc, { name, value }) => {
        acc[`--${name}`] = value;

        return acc;
      }, {});

      return css;
    }, {});

    addComponents(generatedCss);
  };

  const addThemeShadowClasses = ({ addComponents }) => {
    let generatedCss = Object.entries(themesData.themes).reduce((css, [, themeData]) => {
      css[themeData.cssSelector] = themeData.shadows.reduce((acc, { name, effects }) => {
        acc[`--${name}`] = effects.join(', ');

        return acc;
      }, {});

      return css;
    }, {});

    addComponents(generatedCss);
  };

  return plugin(function (pluginApi) {
    addThemeColorClasses(pluginApi);
    addThemeShadowClasses(pluginApi);
  });
};

'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = function (themesData) {
  const addThemeColorBaseClasses = ({ addBase }) => {
    let generatedCss = Object.entries(themesData.themes).reduce((css, [, themeData]) => {
      css[themeData.cssSelector] = themeData.colors.reduce((acc, { name, value }) => {
        acc[`--${name}`] = value;

        return acc;
      }, {});

      return css;
    }, {});

    addBase(generatedCss);
  };

  const addThemeShadowBaseClasses = ({ addBase }) => {
    let generatedCss = Object.entries(themesData.themes).reduce((css, [, themeData]) => {
      css[themeData.cssSelector] = themeData.shadows.reduce((acc, { name, effects }) => {
        acc[`--${name}`] = effects.join(', ');

        return acc;
      }, {});

      return css;
    }, {});

    addBase(generatedCss);
  };

  /*
    This plugin will add base classes for each theme which specify all of the color
    values for that theme.
  */
  return plugin(function (pluginApi) {
    addThemeColorBaseClasses(pluginApi);
    addThemeShadowBaseClasses(pluginApi);
  });
};

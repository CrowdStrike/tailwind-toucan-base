'use strict';

module.exports = {
  configure: ({ FONT_SIZES, themesData }) => [
    require('./interaction.js')(),
    require('./form-fields.js')(),
    require('./line-clamp.js'),
    require('./typography.js')(FONT_SIZES),
    require('./theme-plugin')(themesData),
    require('./variables'),
  ],
};

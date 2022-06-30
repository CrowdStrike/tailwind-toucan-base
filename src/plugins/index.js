'use strict';

module.exports = {
  configure: ({ FONT_SIZES, themesData }) => [
    require('./interaction')(),
    require('./form-fields')(),
    require('./line-clamp'),
    require('./typography')(FONT_SIZES),
    require('./theme-plugin')(themesData),
    require('./variables'),
  ],
};

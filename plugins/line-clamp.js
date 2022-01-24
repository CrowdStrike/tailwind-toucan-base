'use strict';

const plugin = require('tailwindcss/plugin');

const addLineClampUtilities = ({ addUtilities }) => {
  let clampUtility = {};

  for (let c = 1; c <= 10; c++) {
    clampUtility[`.clamp-${c}`] = {
      display: '-webkit-box',
      '-webkit-line-clamp': `${c}`,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    };
  }

  return addUtilities(clampUtility);
};

/*
  Clamp

  this adds overflow hidden and ellipsis for multiple lines of text
  The following utility is added for creating truncated line:

  clamp-<lineNumber>

  This currently support up to 10 lines.

  Examples

    <div>
      <span class="clamp-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac tristique risus, non fermentum neque. Duis eget tempus libero. Sed magna erat, posuere ut mattis non, semper et tortor. Pellentesque ut quam vitae erat lobortis volutpat. Aliquam ornare augue sed mauris laoreet rhoncus. Pellentesque ut massa eros. Vestibulum venenatis tortor justo, tincidunt cursus arcu sollicitudin vitae.
      </span>
    </div>

  This will truncate the paragraph after 2 lines and show an ellipsis

*/
module.exports = plugin(function (pluginApi) {
  addLineClampUtilities(pluginApi);
});

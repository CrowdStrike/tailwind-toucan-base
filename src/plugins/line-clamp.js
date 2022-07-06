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
      <span class="clamp-7">
        Green juice tumeric coloring book, before they sold out sartorial post-ironic edison bulb. Beard fashion axe +1 hell of, bushwick ugh kogi pickled williamsburg chartreuse. Kale chips normcore cornhole, art party before they sold out PBR&B kogi roof party listicle taxidermy asymmetrical actually hot chicken. Etsy XOXO freegan trust fund bicycle rights, cronut meditation chillwave ramps meggings letterpress.
        Pork belly yr pickled twee shaman biodiesel hammock tattooed etsy keffiyeh literally semiotics forage tote bag. Kinfolk chicharrones wolf shaman butcher knausgaard. Ethical seitan beard hella asymmetrical. Prism trust fund lomo, next level sriracha iceland snackwave sustainable chillwave locavore gluten-free drinking vinegar raclette yr. Edison bulb celiac brunch flexitarian. Beard yuccie venmo keytar chillwave tbh trust fund locavore.
      </span>
    </div>

  This will truncate the paragraph after 7 lines and show an ellipsis

*/
module.exports = plugin(function (pluginApi) {
  addLineClampUtilities(pluginApi);
});

'use strict';

function grabShadows({ folderPrefix, styles }) {
  return styles
    .filter((style) => style.visible === true && style.styleType === 'EFFECT')
    .map((style) => {
      let effects = style.effects
        .filter((effect) => {
          if (!['DROP_SHADOW', 'INNER_SHADOW'].includes(effect.type)) {
            // eslint-disable-next-line no-console
            console.log(`Unexpected effect: '${effect.type}' on '${style.name}'`);

            return false;
          }

          return effect.visible;
        })
        .map((effect) => effect.value);

      let name = style.name.replace(folderPrefix, '').replace(/\//g, '-');

      return {
        name,
        effects,
      };
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

module.exports = {
  grabShadows,
};

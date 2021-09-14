'use strict';

function grabAliases(colors) {
  let themeColors = colors.reduce((acc, colorInfo) => {
    acc[colorInfo.name] = true;

    return acc;
  }, {});

  let aliases = colors
    .filter((c) => c.comment.length)
    .flatMap((c) =>
      c.comment.map((comment) => ({
        name: comment,
        value: c.name,
      }))
    )
    .filter(({ name, value }) => {
      if (name === value) {
        // eslint-disable-next-line no-console
        console.error(`Swatch '${name}' is aliased to itself. Ignoring!`);

        return false;
      }

      return true;
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  aliases.forEach(({ name, value }) => {
    if (themeColors[name]) {
      throw new Error(
        `Alias '${name}' for swatch '${value}' conflicts with swatch of the same name.`
      );
    }
  });

  return aliases;
}

module.exports = {
  grabAliases,
};

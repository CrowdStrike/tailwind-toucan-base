'use strict';

function grabColors({ folderPrefix, styles }) {
  return styles
    .filter(
      (style) =>
        style.visible === true && style.styleType === 'FILL' && style.name.startsWith(folderPrefix)
    )
    .map(function (style) {
      let isSupportedFill =
        style.fills.length && style.fills.every((fill) => fill.type === 'SOLID');

      if (!isSupportedFill) {
        // eslint-disable-next-line no-console
        console.error(`Unexpected fills for '${style.name}': ${JSON.stringify(style.fills)}`);

        return;
      }

      let comment = style.comment.split('\n').filter(Boolean);
      let name = style.name.replace(folderPrefix, '');
      let nameParts = name.split('/');

      let fillColor = getColorForFill(style.fills);

      let hasAlpha = fillColor.a !== 1;

      let rgbFill = hasAlpha
        ? fillColor.rgba
        : `rgb(${fillColor.r}, ${fillColor.g}, ${fillColor.b})`;

      return {
        category: nameParts.slice(0, -1),
        comment,
        fill: {
          r: fillColor.r,
          g: fillColor.g,
          b: fillColor.b,
          a: fillColor.a,
        },
        hasAlpha,
        name: escapeDots(nameParts[nameParts.length - 1]),
        rgbFill,
        style,
        value: rgbToHex(fillColor),
      };
    })
    .filter(Boolean);
}

function prepareColorsForJson(colors) {
  return colors
    .map((colorInfo) => ({
      category: colorInfo.category,
      fill: colorInfo.fill,
      hasAlpha: colorInfo.hasAlpha,
      rgbFill: colorInfo.rgbFill,
      name: colorInfo.name,
      value: colorInfo.value,
    }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
}

function escapeDots(str) {
  return str.replace(/\./g, '\\.');
}

function getColorForFill(fills) {
  if (fills.length === 1) {
    return fills[0].color;
  }

  let blended = blendColors.apply(
    this,
    fills.map((fill) => [fill.color.r, fill.color.g, fill.color.b, fill.color.a]).reverse()
  );

  return { r: blended[0], g: blended[1], b: blended[2], a: blended[3] };
}

// https://gist.github.com/JordanDelcros/518396da1c13f75ee057
function blendColors(...args) {
  let base = [0, 0, 0, 0];
  let mix;
  let added;

  while ((added = args.shift())) {
    if (typeof added[3] === 'undefined') {
      added[3] = 1;
    }

    // check if both alpha channels exist.
    if (base[3] && added[3]) {
      mix = [0, 0, 0, 0];
      // alpha
      mix[3] = 1 - (1 - added[3]) * (1 - base[3]);
      // red
      mix[0] = Math.round(
        (added[0] * added[3]) / mix[3] + (base[0] * base[3] * (1 - added[3])) / mix[3]
      );
      // green
      mix[1] = Math.round(
        (added[1] * added[3]) / mix[3] + (base[1] * base[3] * (1 - added[3])) / mix[3]
      );
      // blue
      mix[2] = Math.round(
        (added[2] * added[3]) / mix[3] + (base[2] * base[3] * (1 - added[3])) / mix[3]
      );
    } else if (added) {
      mix = added;
    } else {
      mix = base;
    }

    base = mix;
  }

  return mix;
}

function rgbToHex({ r, g, b, a }) {
  let rgb = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  if (a === 1) {
    return rgb;
  }

  let alphaHex = ((1 << 8) + Math.round(a * 255)).toString(16).slice(1);

  return `${rgb}${alphaHex}`;
}

module.exports = {
  grabColors,
  prepareColorsForJson,
};

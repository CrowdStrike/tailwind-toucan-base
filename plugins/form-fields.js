'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = () =>
  plugin((pluginApi) => {
    addFormFieldStyles(pluginApi);
  });

function addFormFieldStyles({ addComponents }) {
  let textbox = {
    backgroundColor: 'var(--swatch-1-2)',
    borderRadius: 'var(--border-radius)',
    boxShadow: 'inset 0 0 0 1px var(--lines-dark), var(--elevation-inner-md)',
    color: 'var(--swatch-4)',
    display: 'block',
    fontFamily: 'inherit',
    fontSize: '1rem',
    lineHeight: '1.5',
    padding: 'var(--space-1) var(--space-2)',
    width: '100%',

    '&:focus': {
      // TODO: share with definition of boxShadow: shadow-focus-outline
      boxShadow: 'inset 0 0 0 2px var(--focus);',
      outline: 0,
    },

    '&::placeholder': {
      color: 'var(--swatch-7)',
    },
  };

  let textarea = {
    ...textbox,
    minHeight: '150px',
    resize: 'vertical',
  };

  let formFields = {
    '.textbox': textbox,
    '.textarea': textarea,
  };

  addComponents(formFields);
}

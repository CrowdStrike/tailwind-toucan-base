'use strict';

const plugin = require('tailwindcss/plugin');

module.exports = () =>
  plugin((pluginApi) => {
    addFocusStyles(pluginApi);
    addInteractiveStyles(pluginApi);
  });

function addFocusStyles({ addComponents }) {
  addComponents({
    '.focusable': {
      '@apply ring-ground-floor': {},
      '@apply ring-inset': {},
      '@apply ring-offset-2': {},
      '@apply ring-offset-focus': {},
    },

    '.focusable:focus': {
      '@apply outline-none': {},
    },

    '.focusable:focus-visible': {
      '@apply ring-2': {},
    },

    '.focusable-destructive': {
      '@apply ring-offset-destructive-pressed': {},
    },

    '.focusable-outer': {
      '@apply ring-offset-ground-floor': {},
      '@apply ring-offset-1': {},
      '@apply ring-focus': {},
    },

    '.focusable-outer:focus': {
      '@apply outline-none': {},
    },

    '.focusable-outer:focus-visible': {
      '@apply ring-2': {},
    },
  });
}

function addInteractiveStyles({ addComponents }) {
  addComponents({
    '.interactive-normal': {
      '@apply bg-normal-idle': {},
      '@apply shadow-base': {},
      '@apply text-text-and-icons': {},
    },

    '.interactive-normal:not(.interactive-disabled):hover': {
      '@apply bg-normal-hover': {},
      '@apply shadow-md': {},
    },

    '.interactive-normal:not(.interactive-disabled):focus-visible': {
      '@apply bg-normal-hover': {},
    },

    '.interactive-normal:not(.interactive-disabled):active': {
      '@apply bg-normal-pressed': {},
      '@apply shadow-inner-md': {},
    },

    '.interactive-primary': {
      '@apply bg-primary-idle': {},
      '@apply shadow-base': {},
      '@apply text-ground-floor': {},
    },

    '.interactive-primary:not(.interactive-disabled):focus-visible': {
      '@apply bg-primary-hover': {},
    },

    '.interactive-primary:not(.interactive-disabled):hover': {
      '@apply bg-primary-hover': {},
      '@apply shadow-md': {},
    },

    '.interactive-primary:not(.interactive-disabled):active': {
      '@apply bg-primary-pressed': {},
      '@apply shadow-inner-md': {},
    },

    '.interactive-destructive': {
      '@apply bg-destructive-idle': {},
      '@apply shadow-base': {},
      '@apply text-destructive-pressed': {},
    },

    '.interactive-destructive:not(.interactive-disabled):focus-visible': {
      '@apply bg-destructive-hover': {},
      '@apply text-ground-floor': {},
    },

    '.interactive-destructive:not(.interactive-disabled):hover': {
      '@apply shadow-md': {},
      '@apply bg-destructive-hover': {},
      '@apply text-ground-floor': {},
    },

    '.interactive-destructive:not(.interactive-disabled):active': {
      '@apply bg-destructive-pressed': {},
      '@apply text-ground-floor': {},
      '@apply shadow-inner-md': {},
    },

    '.interactive-quiet': {
      '@apply bg-transparent': {},
      '@apply text-text-and-icons': {},
    },

    '.interactive-quiet:not(.interactive-disabled):hover': {
      '@apply bg-normal-hover': {},
      '@apply shadow-md': {},
    },

    '.interactive-quiet:not(.interactive-disabled):active': {
      '@apply bg-normal-pressed': {},
      '@apply shadow-inner-md': {},
    },

    '.interactive-disabled': {
      '@apply bg-overlay-1': {},
      '@apply cursor-default': {},
      '@apply shadow-none': {},
      '@apply text-disabled': {},
    },

    '.interactive-quiet.interactive-disabled': {
      '@apply bg-transparent': {},
    },
  });
}

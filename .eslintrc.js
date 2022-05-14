'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const { nodeMTS } = require('@nullvoxpopuli/eslint-configs/configs/node');

/**
 * TODO: convert this library to ESM,
 *     then we can "just" use configs.nodeTS()
 */
const config = configs.nodeCJS();

module.exports = {
  ...config,
  overrides: [...config.overrides, ...nodeMTS],
};

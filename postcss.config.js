/* eslint import/no-extraneous-dependencies: 0 */

const stylelint = require('stylelint');
const cssnext = require('postcss-cssnext');
const reporter = require('postcss-reporter');

module.exports = {
  plugins: [
    stylelint(),
    cssnext(),
    reporter(),
  ],
};

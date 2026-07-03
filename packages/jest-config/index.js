/**
 * @boilerplate/jest-config
 *
 * Shared Jest configuration for Boilerplate monorepo packages.
 * Also ships `@types/jest` as a dependency so app/package test files
 * get global Jest typings (`describe`, `it`, `expect`) via workspace install.
 *
 * Usage in package.json:
 *   "jest": {
 *     "preset": "@boilerplate/jest-config/base"
 *   }
 *
 * Or in jest.config.js:
 *   const base = require('@boilerplate/jest-config/jest-base');
 *   module.exports = { ...base };
 */

module.exports = {
  base: require('./jest-base'),
  'rn-base': require('./jest-rn-base'),
};

/**
 * @telehealth/jest-config
 *
 * Shared Jest configuration for Telehealth monorepo packages.
 * Also ships `@types/jest` as a dependency so app/package test files
 * get global Jest typings (`describe`, `it`, `expect`) via workspace install.
 *
 * Usage in package.json:
 *   "jest": {
 *     "preset": "@telehealth/jest-config/base"
 *   }
 *
 * Or in jest.config.js:
 *   const base = require('@telehealth/jest-config/jest-base');
 *   module.exports = { ...base };
 */

module.exports = {
  base: require('./jest-base'),
  'rn-base': require('./jest-rn-base'),
};

/**
 * jest-rn-base.js
 *
 * Base Jest configuration for React Native apps.
 * Uses babel-jest with @react-native/babel-preset.
 *
 * Usage:
 *   const base = require('@boilerplate/config/jest-rn-base');
 *   module.exports = {
 *     ...base,
 *     // app-specific overrides (moduleNameMapper, transform plugins, etc.)
 *   };
 *
 * Override tips:
 *   - moduleNameMapper: spread base.moduleNameMapper AFTER app-specific entries
 *     so that app SVG mocks take priority over the generic stub.
 *   - collectCoverageFrom: spread [...base.collectCoverageFrom, ...appExcludes]
 *   - transform: override entirely to add babel plugins (e.g. module-resolver)
 */

/** @type {import('jest').Config} */
module.exports = {
  preset: 'react-native',

  // Default transform — apps can override to add plugins (e.g. module-resolver)
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      { presets: ['module:@react-native/babel-preset'] },
    ],
  },

  // Generic asset mocks — apps can prepend higher-priority matchers
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
    '\\.(png|jpg|jpeg|gif|mp3|wav|ogg)$': 'jest-transform-stub',
  },

  // RN packages that need to be transformed (not excluded)
  transformIgnorePatterns: [
    'node_modules/(?!(' +
      [
        'react-native',
        '@react-native',
        '@react-navigation',
        'react-navigation',
        'react-native-gesture-handler',
        'react-native-screens',
        'react-native-vector-icons',
        'react-native-capture-protection',
        'react-native-confirmation-code-field',
        'react-native-webview',
        'react-native-markdown-display',
        'react-native-google-fit',
        'react-native-health',
        'react-native-health-connect',
        'react-native-reanimated',
        'react-native-worklets',
        'react-native-avoid-softinput',
        '@shopify',
      ].join('|') +
      ')/)',
  ],

  testMatch: ['**/*.(test|spec).(ts|tsx|js|jsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testEnvironment: 'node',

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/__tests__/**/*.{ts,tsx}',
    '!src/**/__mocks__/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.types.{ts,tsx}',
    '!src/**/*.type.{ts,tsx}',
    '!src/**/types/**/*.{ts,tsx}',
    '!src/**/*.model.{ts,tsx}',
    '!src/assets/**/*.{ts,tsx}',
  ],

  coverageThreshold: {
    global: { branches: 1, functions: 1, lines: 1, statements: 1 },
  },
  coverageReporters: ['json-summary', 'lcov', 'text-summary', 'text'],

  verbose: true,
  forceExit: true,
  testTimeout: 10_000,
};

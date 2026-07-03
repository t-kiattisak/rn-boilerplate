/**
 * jest-base.js
 *
 * Base Jest configuration for pure TypeScript packages (no React Native).
 * Uses ts-jest for type-safe transforms.
 *
 * Usage:
 *   const base = require('@boilerplate/config/jest-base');
 *   module.exports = { ...base };
 */

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.{test,spec}.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.{test,spec}.{ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/**/index.{ts,tsx}',
    '!src/**/*.types.{ts,tsx}',
    '!src/**/*.type.{ts,tsx}',
    '!src/**/*.model.{ts,tsx}',
    '!src/**/types/**',
  ],

  coverageThreshold: {
    global: { branches: 1, functions: 1, lines: 1, statements: 1 },
  },
  coverageReporters: ['json-summary', 'lcov', 'text-summary', 'text'],

  verbose: true,
  forceExit: true,
  testTimeout: 10_000,
};

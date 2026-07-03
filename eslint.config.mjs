import baseConfig from '@telehealth/config/eslint.config.mjs';
import i18nJson from 'eslint-plugin-i18n-json';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const enDir = path.join(__dirname, 'apps/telehealth/src/app/i18n/resources/en');
const i18nNamespaces = fs.existsSync(enDir)
  ? fs.readdirSync(enDir).filter((f) => f.endsWith('.json'))
  : [];

const i18nConfigs = i18nNamespaces.map((file) => ({
  files: [`apps/telehealth/src/app/i18n/resources/th/${file}`],
  plugins: {
    'i18n-json': i18nJson,
  },
  processor: i18nJson.processors['.json'],
  rules: {
    'i18n-json/identical-keys': [
      'error',
      {
        filePath: path.resolve(
          __dirname,
          `apps/telehealth/src/app/i18n/resources/en/${file}`
        ),
      },
    ],
    'i18n-json/valid-json': 'error',
  },
}));

export default [
  ...baseConfig,
  ...i18nConfigs,
  {
    files: ['apps/telehealth/src/app/i18n/resources/en/*.json'],
    plugins: {
      'i18n-json': i18nJson,
    },
    processor: i18nJson.processors['.json'],
    rules: {
      'i18n-json/valid-json': 'error',
    },
  },
];

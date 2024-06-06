import globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from '@typescript-eslint/parser';
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";


export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2015,
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect', // Reactのバージョンを自動的に検出
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'react/prop-types': 'off',
      "import/no-anonymous-default-export": 'off',
    },
  },
  ...tseslint.configs.recommended,
  pluginReactConfig,
];
import tsParser from '@typescript-eslint/parser';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line import/no-anonymous-default-export
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
        ...tseslint.configs.recommended,
        pluginReactConfig,
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
            'react/prop-types': 'off',
            'import/no-anonymous-default-export': 'off',
        },
    },
];

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

/** @type {import("eslint").Config} */
const config = defineConfig([
    globalIgnores([
        '.next',
        'dist',
        'build',
        'out',
        'next-env.d.ts',
        'scripts',
    ]),
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [['^.*']],
                },
            ],
            'simple-import-sort/exports': 'error',
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'any', prev: 'import', next: 'import' },
            ],
            'react/jsx-curly-brace-presence': [
                'error',
                {
                    props: 'never',
                    children: 'never',
                },
            ],
            'react/self-closing-comp': [
                'error',
                {
                    component: true,
                    html: true,
                },
            ],
            'react/jsx-no-useless-fragment': [
                'error',
                {
                    allowExpressions: true,
                },
            ],
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error'],
                },
            ],
            eqeqeq: ['error', 'always'],
            'arrow-body-style': ['error', 'as-needed'],
            'import/newline-after-import': ['error', { count: 1 }],
            'import/no-duplicates': 'error',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [{ regex: '^\\.\\./' }],
                },
            ],
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'function-declaration',
                    unnamedComponents: 'function-expression',
                },
            ],
        },
    },
]);

export default config;

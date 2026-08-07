/** @type {import("stylelint").Config} */
const config = {
    extends: ['stylelint-config-standard'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'theme',
                    'source',
                    'utility',
                    'variant',
                    'custom-variant',
                    'apply',
                    'reference',
                    'config',
                    'plugin',
                    'tailwind',
                    'layer',
                ],
            },
        ],
        'import-notation': 'string',
        'custom-property-pattern': null,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'no-descending-specificity': null,
        'media-feature-range-notation': null,
        'alpha-value-notation': null,
        'lightness-notation': null,
        'hue-degree-notation': null,
        'color-hex-length': null,
        'color-function-notation': null,
        'comment-empty-line-before': null,
        'value-keyword-case': [
            'lower',
            {
                ignoreKeywords: ['currentColor'],
                ignoreProperties: ['--font-sans', '--font-serif'],
            },
        ],
    },
};

export default config;

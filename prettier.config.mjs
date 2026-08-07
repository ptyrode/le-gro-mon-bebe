/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    singleAttributePerLine: true,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindFunctions: ['cn', 'cva'],
};

export default config;

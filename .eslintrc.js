module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'google',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./functions/tsconfig.json', './functions/tsconfig.dev.json'],
        sourceType: 'module',
    },
    ignorePatterns: [
        '/lib/**/*', // Ignore built files.
    ],
    plugins: [
        '@typescript-eslint',
        'import',
    ],
    rules: {
        'padded-blocks': 'off',
        'import/no-unresolved': 0,
        'semi': 'off',
        'quotes': [2, 'single', 'avoid-escape'],
        'indent': 'off',
        'no-unused-vars': 'off',
        'newline-before-return': 'error',
        '@typescript-eslint/semi': [
            'error',
            'never',
        ],
        '@typescript-eslint/quotes': [
            'error',
            'single',
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-explicit-any': [
            'error',
            {
                ignoreRestArgs: true,
            },
        ],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false,
                },
            },
        ],
    },
};

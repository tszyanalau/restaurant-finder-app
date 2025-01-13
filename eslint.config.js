import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { ignores: ['dist/*', 'coverage/*'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    rules: {
      'array-callback-return': 'error',
      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'dot-notation': 'error',
      indent: 0,
      'max-len': [
        'error',
        {
          code: 130,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      'multiline-ternary': 0,
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-negated-condition': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-undef': 0,
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'object-shorthand': 'error',
      'operator-linebreak': 0,
      'space-in-parens': 0,
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': [
        'error',
        {
          object: true,
        },
      ],
      'prefer-regex-literals': 'error',
      'prefer-template': 'error',
      'quote-props': ['error', 'as-needed'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'react/button-has-type': 'error',
      'react/jsx-boolean-value': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/no-array-index-key': 'error',
      'react/react-in-jsx-scope': 0,
      'react/self-closing-comp': 'error',
      'react/state-in-constructor': 'error',
    },
  },
]

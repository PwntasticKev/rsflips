/* NOTE: Make sure you have this setting in your IDE:
* PhpStorm: Languages and Frameworks
*              -> JavaScript
*                -> Code Quality Tools
*                  -> ESLint
*                    -> Run eslint --fix on save
* VS Code: ExtensionsAdd a config with:
*              -> ESLint
*                "editor.codeActionsOnSave": {
*                  "source.fixAll": true
*               }
*/

/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['eslint-plugin-prettier', 'simple-import-sort'],
  rules: {
    'import/no-cycle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 0,
    'no-shadow': [
      'error',
      { builtinGlobals: false, hoist: 'functions', allow: ['getters', 'state', 'params'] }
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        tabWidth: 2,
        tabs: false,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        printWidth: 80,
        trailingComma: 'none',
        htmlWhitespaceSensitivity: 'ignore'
      }
    ],
    'comma-dangle': ['error', 'never'],
    // 'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'operator-linebreak': 0,
    'no-return-assign': 0,
    'consistent-return': 0,
    'max-len': [
      'error',
      {
        code: 90,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true
      }
    ],
    'implicit-arrow-linebreak': 0,
    curly: ['error', 'multi-or-nest'],
    'nonblock-statement-body-position': 0,
    'function-paren-newline': 0,
    'no-await-in-loop': 0,
    // 'template-curly-spacing': ['error', 'never'],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true
      }
    ],
    indent: 'off'
  }
}; /* NOTE: Make sure you have this setting in your IDE:
 * PhpStorm: Languages and Frameworks
 *              -> JavaScript
 *                -> Code Quality Tools
 *                  -> ESLint
 *                    -> Run eslint --fix on save
 * VS Code: ExtensionsAdd a config with:
 *              -> ESLint
 *                "editor.codeActionsOnSave": {
 *                  "source.fixAll": true
 *               }
 */

/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  plugins: ['eslint-plugin-prettier', 'simple-import-sort'],
  rules: {
    'import/no-cycle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/extensions': 0,
    'no-shadow': [
      'error',
      { builtinGlobals: false, hoist: 'functions', allow: ['getters', 'state', 'params'] }
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        tabWidth: 2,
        tabs: false,
        semi: true,
        singleQuote: true,
        bracketSpacing: true,
        printWidth: 80,
        trailingComma: 'none',
        htmlWhitespaceSensitivity: 'ignore'
      }
    ],
    'comma-dangle': ['error', 'never'],
    // 'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'operator-linebreak': 0,
    'no-return-assign': 0,
    'consistent-return': 0,
    'max-len': [
      'error',
      {
        code: 90,
        tabWidth: 2,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true
      }
    ],
    'implicit-arrow-linebreak': 0,
    curly: ['error', 'multi-or-nest'],
    'nonblock-statement-body-position': 0,
    'function-paren-newline': 0,
    'no-await-in-loop': 0,
    // 'template-curly-spacing': ['error', 'never'],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true
      }
    ],
    indent: 'off'
  }
};

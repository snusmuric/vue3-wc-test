module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    curly: 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/semi': 'off',
    semi: 'off',
    quotes: 'off',
    'brace-style': 'off',
    'arrow-parens': 'off',
    'spaced-comment': 'off',
    'vue/html-self-closing': 'off',
  },
}

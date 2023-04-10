module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  rules: {
    camelcase: 'off',
    'import/order': 'off',
    'vue/max-attributes-per-line': 'off',
    indent: 'off',
    'arrow-parens': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'vue/require-prop-types': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'template-curly-spacing': 'off',
    'no-console': 'off'
  }
}

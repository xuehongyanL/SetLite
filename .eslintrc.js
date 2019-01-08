module.exports = {
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 6,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    "$": true,
    "process": true,
    "__dirname": true
  },
  plugins: [
    'react'
  ],
  rules: {
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "no-var": 2,
    "no-console": "off",
    "no-mixed-operators": 0,
    "no-unused-expressions": 0,
    "no-unused-vars":0,
    "space-infix-ops":2,
    "brace-style": ["error", "stroustrup", { "allowSingleLine": true }]
  },
  settings: {
    "import/ignore": ["node_modules"]
  }
};
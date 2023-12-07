{
  "extends": "eslint-config-airbnb",
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": ".storybook/webpack.config.js"
      }
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "arrow-body-style": 1,
    "no-console": 2,
    "import/no-extraneous-dependencies": 0,
    "no-undef": 0,
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": 0,
    "react/require-default-props": 1,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "react/prop-types": [1, { "skipUndeclared": true }]
  }
}

{
  "extends": "eslint-config-airbnb",
  "settings": {
    "import/resolver": {
      "node": {},
      "webpack": {
        "config": ".storybook/webpack.config.js"
      }
    }
  },
  "plugins": [
    "react",
    "babel"
  ],
  "rules": {
      "arrow-parens": ["error", "as-needed", { "requireForBlockBody": true }],
      "arrow-body-style": "off",
      "no-async-promise-executor": "off",
      "no-console": "error",
      "no-useless-catch": "off",
      "import/no-extraneous-dependencies": "off",
      "no-undef": "off",
      "prefer-object-spread": "off",
      "react/state-in-constructor": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-curly-newline": "off",
      "react/jsx-curly-brace-presence": "off",
      "react/jsx-fragments": "off",
      "react/require-default-props": "off",
      "max-classes-per-file": "off",
      "no-mixed-operators": "off",
      "space-before-function-paren": "off",
      "comma-dangle": "off",
      "react/prop-types": ["warn", { "skipUndeclared": true }],
      "react/static-property-placement": "off",
      "react/jsx-one-expression-per-line": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "no-unused-expressions": "off",
      "babel/no-unused-expressions": "error",
      "babel/valid-typeof": "error",
      "import/extensions": "off"
    }
}

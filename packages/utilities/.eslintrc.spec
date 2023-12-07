{
  "extends": "../../.eslintrc.spec",
  "rules": {
    "jsdoc/require-file-overview": "off",
    "import/newline-after-import": "error",
    "import/order": ["error", {
      "newlines-between": "always"
    }],
    "no-use-before-define": ["error", {
      "classes": true,
      "functions": false,
      "variables": true
    }]
  }
}

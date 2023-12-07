{
  "extends": "../../.eslintrc.spec",
    "rules": {
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "@univision/fe-commons/dist/store/store",
        "importNames": ["default"],
        "message": "Global Store is deprecated, please use for test/stories 'store/configureStore' instead."
      }]
    }]
  }
}

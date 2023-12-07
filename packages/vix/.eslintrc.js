module.exports = {
  "extends": [
    "../../.eslintrc",
    "plugin:@next/next/recommended"
  ],
  "rules": {
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "@univision/fe-commons/dist/store/store",
        "importNames": ["default"],
        "message": "Global Store is deprecated, please use 'ReduxContext' or 'useSelector', 'useDispatch' instead."
      }, {
        "name": "@univision/fe-commons/dist/store/configureStore",
        "importNames": ["default"],
        "message": "Global Store is deprecated, please use 'ReduxContext' or 'useSelector', 'useDispatch' instead."
      }]
    }],
    "@next/next/no-html-link-for-pages": ["warn", `${__dirname}/src/pages`]
  }
}

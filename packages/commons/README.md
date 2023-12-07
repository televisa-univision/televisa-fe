# univision-fe-commons
React Common Components and Utilities for Univision.com webapp

Features

* Storybook preview
* Use the common webpack loaders
* Hot reloader

Quick Start
===========

Install node [active LTS](https://github.com/nodejs/Release#release-schedule) version
```sh
$ yarn
$ yarn start
```
* Go to `http://localhost:6007/`
* Interact with the list of components
* `Ctrl + C` to stop services

Integration into other webpack based apps
=========================================

* On `webpack.config.js` include alias for:
  * `./node_modules/@univision/fe-commons/dist/components`
  * `./node_modules/@univision/fe-commons/dist/utils`
* if using jest on `package.json` use the same alias on `moduleNameMapper` 

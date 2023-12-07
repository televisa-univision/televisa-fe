# univision-fe-local
React Components for local verticals

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
* Go to `http://localhost:6008/`
* Interact with the list of components
* `Ctrl + C` to stop services

Integration into other webpack based apps
=========================================

* On `webpack.config.js` include an alias for `./node_modules/@univision/fe-local/dist/`
* On `package.json` use the same alias on `moduleNameMapper` if using jest

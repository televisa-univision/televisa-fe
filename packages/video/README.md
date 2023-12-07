# @univision/fe-video
React Components for @univision/fmg-video-sdk integration

Features

* Storybook preview
* Use the common webpack loaders
* Hot reloader

Quick Start
===========

Install node [active LTS](https://github.com/nodejs/Release#release-schedule) version
```sh
$ npm install
$ cp .env.example .env
$ npm start
```
* Go to `http://localhost:6008/`
* Interact with the list of components
* `Ctrl + C` to stop services

Integration into other webpack based apps
=========================================

* On `webpack.config.js` include an alias for `./node_modules/@univision/fe-video/dist/`
* On `package.json` use the same alias on `moduleNameMapper` if using jest

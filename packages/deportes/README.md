# univision-fe-deportes
React Components for TUDN

Features

* Storybook preview
* Use the common webpack loaders
* Hot reloader

Quick Start
===========

* Install node [active LTS](https://github.com/nodejs/Release#release-schedule) version
```sh
$ npm install
$ npm start
```
* Go to `http://localhost:6008/`
* Interact with the list of components
* `Ctrl + C` to stop services

Integration into other webpack based apps
=========================================

* On `webpack.config.js` include an alias for `./node_modules/@univision/fe-deportes/dist/`
* On `package.json` use the same alias on `moduleNameMapper` if using jest

TUDN Architecture 
========================
![TUDN Architecture](https://user-images.githubusercontent.com/14242544/132546113-0a3b9708-b2d8-40f6-8e54-16636c865f36.png)

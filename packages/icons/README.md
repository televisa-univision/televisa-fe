# Univision Icons React Library
Univision icons library to React Native and React webapp

Features

* Storybook preview on ios/android/web
* Support mobile native and web
* Hot reloader
* Dynamic icon load

Quick Start
===========

Install node [active LTS](https://github.com/nodejs/Release#release-schedule) version
```sh
$ yarn
$ yarn start
```
* Go to `http://localhost:6006/`
* Interact with the list of components
* `Ctrl + C` to stop services

## Setup for development
### React Native Installation
1. install react-native dependencies by following [these instructions](https://facebook.github.io/react-native/docs/0.44/getting-started.html)(click on "Building Projects with Native Code")
2. If running ios, make sure you have [cocoapods installed](https://stackoverflow.com/questions/20755044/how-to-install-cocoa-pods), `cd ios/` into your ios folder and run `pod install`
3. run `yarn run:ios` or `yarn run:android` (you should have installed react-native-cli in step 1)

### Components browser (Storybook) for React Native
Use [Storybook](https://github.com/storybooks/storybook) to view and develop components:
1. Make sure the app is installed on the simulator device (run `yarn run:ios` or `yarn run:android` at least once)
2. Open the app in the simulator
3. Run `yarn run storybook:native`
4. Open the storybook page in your browser [http://localhost:7007](http://localhost:7007)
5. Reload the app in the simulator to connect to Storybook

If android gives you a websocket connection error, run `adb reverse tcp:7007 tcp:7007` in your terminal.

### Components browser (Storybook) for Web
Use [Storybook](https://github.com/storybooks/storybook) to view and develop components:
1. Run `yarn run storybook`
2. Open the storybook page in your browser [http://localhost:6006](http://localhost:6006)

Both web and native apps are referncing the same component entry points, so you should be able to run development with both ports open and see changes in real time.

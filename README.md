(Tested only in iPhone)

### Quick start
* (one time) npm install -g exp
* ```yarn install```
* ```yarn start```
* From your phone, open Expo Client & scan the barcode shown in terminal

### How to run (dev)
* Install [Yarn](https://yarnpkg.com/en/), then run ```yarn install```
* Install [Expo](https://docs.expo.io/versions/latest/introduction/installation.html) to your Mac
* Install [Expo Client](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) to your phone
* (optional) Install [react-native-debugger](https://github.com/jhen0409/react-native-debugger#options) ```brew update && brew cask install react-native-debugger```
* From your Mac: open Expo, [open your project](https://docs.expo.io/versions/latest/introduction/xde-tour.html)
* (optional) From your Mac: ```yarn run debug```, and wait for react native debugger to connect
* From your phone: open Expo Client & scan the "Share" barcode (from Expo Mac)
* (troubleshoot): if debugger is not connecting, check if ```Debug JS Remotely``` is enabled on phone. Shake the device to view [debug](https://docs.expo.io/versions/latest/guides/debugging.html) menu

### Storybook
* Complete the steps in "How to run" section first
* In ```/config.js``` change the ```LOAD_STORY_BOOK``` boolean variable to ```true```.
* ```yarn run storybook```
* From your Mac: Go to ```localhost:7007``` from your browser
* From your phone: Run the app (on Expo Client)

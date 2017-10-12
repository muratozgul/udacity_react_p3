/* eslint-disable global-require */
import url from 'url';
import { AppRegistry, NativeModules } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true, host: hostname });
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUI);
export default StorybookUI;

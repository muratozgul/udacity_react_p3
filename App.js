import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { onInitializeApp, onAppDidMount } from './initialization';
import AppNavigatorWithState from './navigation/AppNavigator';
import { LOAD_STORY_BOOK } from './config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});

const APP = onInitializeApp();

class AppComponent extends Component {
  componentDidMount() {
    onAppDidMount(APP);
  }

  render() {
    const statusBarStyle = Platform.OS === 'ios'
                           ? { height: 20 }
                           : styles.statusBarUnderlay;
    return (
      <Provider store={APP.store}>
        <View style={styles.container}>
          <View style={statusBarStyle}>
            {Platform.OS === 'ios' && <StatusBar barStyle='default' />}
          </View>
          <AppNavigatorWithState />
        </View>
      </Provider>
    );
  }
}

let ExportedComponent; // either "App" or "Storybook" for development
if (__DEV__ && LOAD_STORY_BOOK) {
  ExportedComponent = require('./storybook').default;
} else {
  ExportedComponent = AppComponent;
}

export default ExportedComponent;

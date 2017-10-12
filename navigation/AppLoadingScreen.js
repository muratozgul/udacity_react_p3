import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export default class AppLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating size='large' />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

  import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  YellowBox 
} from 'react-native';

import App from './App';


// Hide the deprecated warning
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader',
  `Warning: Can't call setState (or forceUpdate) on an unmounted component.`]);

export default class SertApplicationV7 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('SertApplicationV7',() => SertApplicationV7);
import React, { Component } from 'react'
import { View, Platform, StatusBar } from 'react-native';
import firebase from 'firebase'
import { AppLoading } from 'expo';
import AppNavigator from '../../navigation/AppNavigator';

firebase.initializeApp({
  apiKey: "AIzaSyCTMBaq9RlIWvTBh1f0SrT9_c2dGpcxW0M",
  authDomain: "authentication-1cf29.firebaseapp.com",
  databaseURL: "https://authentication-1cf29.firebaseio.com",
  projectId: "authentication-1cf29",
  storageBucket: "authentication-1cf29.appspot.com",
  messagingSenderId: "831800395281"
});

export class OSAC extends Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([
      //   require('./assets/images/robot-dev.png'),
      //   require('./assets/images/robot-prod.png'),
      // ]),
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in HomeScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      // }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = {
  container: {
    flex: 1,
  }
}

export default OSAC

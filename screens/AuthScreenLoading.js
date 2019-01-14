import React from 'react'
import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native'

class AuthScreenLoading extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'Settings' : 'Auth');
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default AuthScreenLoading

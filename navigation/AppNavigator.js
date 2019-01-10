import React from 'react';
import { Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthScreen from '../screens/AuthScreen';
import AuthScreenLoading from '../screens/AuthScreenLoading';
import SettingsScreen from '../screens/SettingsScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  AuthLoading: AuthScreenLoading,
  Auth: AuthScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading',
}));
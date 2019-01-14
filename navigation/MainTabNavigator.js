import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DanhGiaScreen from '../screens/DanhGiaScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';

const defaultNavOpts = {
  headerTintColor: Colors.osacColor,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
}, {
    defaultNavigationOptions: { ...defaultNavOpts, ...defaultNavOpts.title = 'Thực Đơn JABIL' },
    headerLayoutPreset: 'center',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Thực Đơn',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'} />
  ),
 
}


const DanhGiaStack = createStackNavigator({
  DanhGia: DanhGiaScreen,
}, {
    defaultNavigationOptions: { ...defaultNavOpts, ...defaultNavOpts.title = 'Phiếu Đánh Giá Căn Tin' },
    headerLayoutPreset: 'center',
  }
);

DanhGiaStack.navigationOptions = {
  tabBarLabel: 'Đánh Giá',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
}, {
    defaultNavigationOptions: { ...defaultNavOpts, ...defaultNavOpts.title = 'Tài Khoản' },
    headerLayoutPreset: 'center',
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Tài Khoản',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  DanhGiaStack,
  SettingsStack,
});

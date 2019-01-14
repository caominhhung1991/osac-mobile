import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import Colors from '../constants/Colors';
import { Settings } from '../components/SettingsComponent';


export default class SettingsScreen extends React.Component {
  render() {
    return <Settings {...this.props} />;
  }
}

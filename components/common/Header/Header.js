import React, { Component, createContext } from 'react'
import {
  View,
  Text,
} from 'react-native'

const COLOR_OSAC = '#d3531a';

export class Header extends Component {
  render() {
    const { viewStyle, textStyle } = styles;
    const { headerText } = this.props;
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{headerText}</Text>
      </View>
    )
  }
}

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    posistion: 'ralative',
  },
  textStyle: {
    fontSize: 20,
    color: COLOR_OSAC,
  }
}

import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import Colors from '../../../constants/Colors';

const BLUE_COLOR = '#007aff';
const OSAC_COLOR = Colors.osacColor;

const Button = (props) => {
  const { buttonStyle, textStyle } = styles;
  const { children, onPress, style, icon, disabled } = props;
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress: () => {}}
      style={[
        buttonStyle, 
        { ...style.buttonStyle }, 
        disabled ? styles.disabledButtonStyle: null
      ]}
    >
      <View style={styles.viewIconStyle}>
        {icon ? <Image style={styles.iconStyle} source={icon} /> : null}
      </View>
      <Text style={[
        textStyle, 
        { ...style.textStyle },
        disabled ? styles.disabledTextStyle: null
        ]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
    backgroundColor: OSAC_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: OSAC_COLOR,
    marginLeft: 5,
    marginRight: 5,
  },
  viewIconStyle: {
    position: 'absolute',
    top: 2.5,
    left: 4,
  },
  iconStyle: {
    width: 35,
    height: 35,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  disabledButtonStyle: {
    backgroundColor: 'transparent',
  },
  disabledTextStyle: {
    color: Colors.osacColor,
  }
}

Button.defaultProps = {
  style: {
    buttonStyle: {},
    textStyle: {},
  },
  icon: null,
}



export { Button }

import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native';
import { Button as ButtonElement } from 'react-native-elements';
import Colors from '../../../constants/Colors';

const OSAC_COLOR = Colors.osacColor;

const Button = (props) => {
  const {
    children, containerViewStyle,
    onPress, onLongPress,
    icon, disabled,
    outline,
    buttonStyle, textStyle, colorStyle,
    loading } = props;
  return (
    <ButtonElement
      containerViewStyle={[styles.containerViewStyle, containerViewStyle]}
      icon={icon}
      onPress={onPress}
      onLongPress={onLongPress}
      title={children}
      buttonStyle={[outline ? styles.buttonOutlineStyle : styles.buttonStyle, buttonStyle]}
      textStyle={[outline ? styles.titleOutlineStyle : styles.titleStyle, textStyle]}
      loading={loading}
      disabled={disabled}
      disabledStyle={styles.disabledStyle}
      disabledTextStyle={styles.disabledTextStyle}
      Component={TouchableOpacity}
      transparent
      loading={loading}
    />
  )
}

const styles = {
  colorStyle: '#fff',
  colorOutlineStyle: Colors.osacColor,
  buttonStyle: {
    backgroundColor: OSAC_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: OSAC_COLOR,
  },
  buttonOutlineStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: OSAC_COLOR,
  },
  titleStyle: { color: '#fff' },
  titleOutlineStyle: { color: Colors.osacColor },
  disabledStyle: {
    backgroundColor: '#fff',
  },
  disabledTextStyle: {
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
  containerViewStyle: {
    backgroundColor: '#ffffff10',
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

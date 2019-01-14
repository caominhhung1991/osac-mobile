import React from 'react'
import PropTypes from 'prop-types'
import {
  TextInput,
  View,
  Text,
} from 'react-native'

const Input = (props) => {
  const { label, value, onChangeText, placeholder, secureTextEntry } = props;
  const { inputStyle, labelStyle, containerStyle, bottomLineStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        autoCapitalize='none'
      />
      <Text style={bottomLineStyle}></Text>
    </View>
  )
}

const styles = {
  containerStyle: {
    flex: 1,
  },
  labelStyle: {
    color: '#9F9F9F',
    fontSize: 18,
    paddingLeft: 5,
    flex: 1,
  },
  inputStyle: {
    color: '#000',
    marginTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    flex: 1,
  },
  bottomLineStyle: {
    backgroundColor: '#E0E0E0',
    width: '97%',
    height: 1.5,
    marginLeft: 5,
    marginTop: 3,
  }
}

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
}

export { Input }

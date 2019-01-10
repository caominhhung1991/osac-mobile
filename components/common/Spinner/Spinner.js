import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'

const Spinner = (props) => {
  const { size } = props;
  const { spinnerStyle } = styles;
  return (
    <View style={spinnerStyle}>
      <ActivityIndicator
        size={size || 'large'}
      />
      <Text style={{marginTop: 15}}>Đang lấy dữ liệu...</Text>
    </View>
  )
}

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  }
}

export { Spinner }

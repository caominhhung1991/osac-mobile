import React from 'react'
import { View } from 'react-native'

const CardSection = (props) => {
  const { containerStyle } = styles;
  const { children, style } = props;

  return (
    <View style={[containerStyle, style]}>
      {children}
    </View>
  )
}

const styles = {
  containerStyle: {
    // borderBottomWidth: 1,
    // borderColor: '#ddd',
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  }
}

export { CardSection }

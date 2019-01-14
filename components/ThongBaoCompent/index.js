import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import styles from './ThongBaoStyles';
import Colors from '../../constants/Colors';

const propTypes = {
  texts: PropTypes.array,
  visible: PropTypes.bool,
}

const ThongBao = (props) => {
  const { visible, texts } = props;
  if (visible) {
    return (
      <View style={styles.containerStyle}>
        <Text style={{ color: Colors.googleColor, fontWeight: 'bold' }}>
          Thông báo
        </Text>
        {
          texts.map((text, index) => {
            if (text)
              return <Text key={text + index} style={styles.textStyle}>{text}</Text>
          })
        }
      </View>
    )
  }
  return null;
}

ThongBao.propTypes = propTypes;
ThongBao.defaultProps = {
  text: [],
  visible: false,
}

export default ThongBao

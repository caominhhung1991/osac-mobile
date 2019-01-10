import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors';
import { CardSection } from '../common/Card/CardSection';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { sohappy, happy, unhappy } from '../../assets/images';

const propTypes = {
  question: PropTypes.object.isRequired,
  onChangeDanhGia: PropTypes.func.isRequired,
}

const SO_HAPPY = 'sohappy';
const HAPPY = 'happy';
const UN_HAPPY = 'unhappy';

class Question extends Component {
  static defaultProps = {

  }

  render() {
    const { question } = this.props;
    const { onChangeDanhGia } = this.props;

    return [
      <CardSection key={question.title + 1} style={[styles.cardSectionStyle]} >
        <Text style={styles.questionTextStyle}>{question.title}</Text>
      </CardSection>,
      <CardSection key={question.title + 2} style={[styles.cardSectionStyle, { justifyContent: 'space-around', marginBottom: 5 }]}>
        <TouchableOpacity onPress={() => onChangeDanhGia(question, SO_HAPPY)}>
          <View style={question.danhgia === SO_HAPPY ? styles.choosedStyle : null}>
            <Image style={[styles.faceIcons]} source={sohappy} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangeDanhGia(question, HAPPY)}>
          <View style={question.danhgia === HAPPY ? styles.choosedStyle : null}>
            <Image style={styles.faceIcons} source={happy} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChangeDanhGia(question, UN_HAPPY)}>
          <View style={question.danhgia === UN_HAPPY ? styles.choosedStyle : null}>
            <Image style={styles.faceIcons} source={unhappy} />
          </View>
        </TouchableOpacity>
      </CardSection>
    ]
  }
}

const styles = {
  cardSectionStyle: {
    padding: 0,
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  questionTextStyle: {
    fontSize: 20,
    color: Colors.osacColor,
    fontWeight: 'bold',
  },
  faceIcons: {
    width: 44,
    height: 44,
  },
  choosedStyle: {
    borderWidth: 3,
    borderColor: Colors.blueColor,
    borderRadius: 26,
  },
}

Question.propTypes = propTypes;

export default Question

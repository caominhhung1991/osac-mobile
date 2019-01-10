import React from 'react';
import { connect } from 'react-redux';
import {
  NetInfo,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Text,
  DatePickerIOS,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  Alert,
  Platform
} from 'react-native';
import Colors from '../constants/Colors';
import { danhgia } from '../assets/images';
import danhgiaPNG from '../assets/images/danhgia.png'
import { windowWidth } from '../constants/Layout';
import { Button, Card, CardSection } from '../components/common';
import Question from '../components/DanhGiaComponent/Question';
import { addDanhGia, setCanDanhGia } from '../containers/OSAC/OsacActions';

class DanhGiaScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      // headerRight: (
      //   <Button
      //     onPress={this._setToday}
      //     title='Today'
      //     color={Colors.osacColor}
      //   />
      // ),
      // headerLeft: (
      //   <Button
      //     onPress={() => navigation.navigate('Home')}
      //     title='Thực Đơn'
      //     color={Colors.osacColor}
      //   />
      // ),
    }
  }

  state = {
    isConnected: true,
    imageWidth: 0,
    imageHeight: 0,
    today: new Date(),
    isFocus: false,
    modalVisible: false,
    question1: {
      id: 'question1',
      title: 'Chất lượng bữa ăn?',
      danhgia: 'happy',
    },
    question2: {
      id: 'question2',
      title: 'Khẩu vị bữa ăn?',
      danhgia: 'happy',
    },
    question3: {
      id: 'question3',
      title: 'Vệ sinh an toàn thực phẩm?',
      danhgia: 'happy',
    },
    question4: {
      id: 'question4',
      title: 'Thái độ phục vụ?',
      danhgia: 'happy',
    },
    yKien: '',
  }

  componentDidMount() {
    const { width, height } = Image.resolveAssetSource(danhgiaPNG)
    const scaleFactor = width / windowWidth;
    const imageHeight = height / scaleFactor;
    this.setState({
      imageWidth: windowWidth,
      imageHeight: imageHeight,
    })

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected })
  }

  showDate = () => {
    const { today } = this.state;
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
  }

  showDatePickerAndroid = () => {
  }

  render() {
    const { isDanhGia } = this.props;
    const { isConnected } = this.state;
    return (
      <ScrollView style={styles.container} ref='scrollView'>
        {/* <Modal animationType='slide' visible={this.state.modalVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <DatePickerIOS
              minimumDate={new Date('01/01/2018')}
              maximumDate={new Date()}
              mode='date'
              style={{ width: 300 }}
              date={this.state.today}
              onDateChange={this._onDateChange} />
            <CardSection>
              <Button onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>Chọn ngày</Button>
              <Button onPress={this._setToday}>Reset hôm nay</Button>
            </CardSection>
          </View>
        </Modal> */}

        <ImageBackground
          style={[styles.backgroundImage, { width: '100%', height: '100%' }]}
          source={danhgia}
        >
          <Card style={styles.backgroundWhite}>
            <CardSection style={{ padding: 0, backgroundColor: 'transparent' }}>
              <Text style={styles.ngayStyle}>Ngày: </Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: Colors.googleColor }}>
                <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                  <Text style={styles.ngayValueStyle}>{this.showDate()}</Text>
                </TouchableOpacity>
              </View>
              <Button style={styles.todayButtonStyle} onPress={this._setToday}>Hôm nay</Button>
            </CardSection>
          </Card>

          <Card style={[styles.backgroundWhite, { marginTop: 10 }]}>
            <Question question={this.state.question1} onChangeDanhGia={this.onChangeDanhGia} />
            <Question question={this.state.question2} onChangeDanhGia={this.onChangeDanhGia} />
            <Question question={this.state.question3} onChangeDanhGia={this.onChangeDanhGia} />
            <Question question={this.state.question4} onChangeDanhGia={this.onChangeDanhGia} />

            <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={150}
              behavior='position' enabled={this.state.isFocus}
              contentContainerStyle={this.state.isFocus ? { backgroundColor: '#fff' } : {}}
            >
              <CardSection style={[styles.cardSectionStyle, { justifyContent: 'space-around' }]}>
                <TextInput
                  style={styles.yKienStyle}
                  multiline numberOfLines={3}
                  editable maxLength={500}
                  placeholder='ý kiến của bạn để phục vụ tốt hơn'
                  autoCorrect={false}
                  onFocus={this._onFocus}
                  onEndEditing={this._onEndEditing}
                  value={this.state.yKien}
                  onChangeText={(yKien) => this.onChangeText({ yKien })}
                />
              </CardSection>
            </KeyboardAvoidingView>

            <CardSection style={[styles.cardSectionStyle, { marginTop: 10 }]}>
              <Button
                onPress={this.onSubmit}
                disabled={isDanhGia || !isConnected}
              >Gửi</Button>
              {/* <Button onPress={() => {}}>Sửa đánh giá</Button> */}
            </CardSection>
          </Card>
        </ImageBackground>

      </ScrollView>
    );
  }

  _showThucDon = () => {
    this.props.navigation.navigate('Main');
  }

  _setToday = () => {
    this.props.setCanDanhGia(false);
    this.setState({
      today: new Date(),
    })
  }

  _onDateChange = (newDate) => {
    this.setState({
      today: newDate
    })
  }

  _onFocus = () => {
    this.setState({
      isFocus: true
    })
  }

  _onEndEditing = () => {
    this.setState({
      isFocus: false
    })
    // this.refs.scrollView.scrollTo({x: 0, y: 0});
  }

  setModalVisible(visible) {
    if (Platform.OS === 'ios') {
      // this.setState({ modalVisible: visible });
    }
  }

  onChangeDanhGia = (question, danhgia) => {
    this.props.setCanDanhGia(false);
    this.setState({
      [question.id]: {
        ...question,
        danhgia: danhgia,
      }
    })
  }

  onChangeText = ({ yKien }) => {
    this.props.setCanDanhGia(false);
    this.setState({
      yKien
    })
  }

  onSubmit = () => {
    const { today } = this.state;
    const { addDanhGia, setCanDanhGia } = this.props;
    const danhgia = {
      danhgiaId: `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`,
      datetime: `${this.state.today}`,
      question1: this.state.question1,
      question2: this.state.question2,
      question3: this.state.question3,
      question4: this.state.question4,
      yKien: this.state.yKien,
    }
    setCanDanhGia(true);
    addDanhGia(danhgia);
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
  },
  backgroundWhite: {
    width: windowWidth * 0.90,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 5,
  },
  ngayStyle: {
    color: Colors.osacColor,
    fontSize: 25,
    marginTop: 5,
  },
  ngayValueStyle: {
    fontSize: 25,
    letterSpacing: 3,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
  },
  todayButtonStyle: {
    buttonStyle: {
      marginRight: 0,
    }
  },
  guiButtonStyle: {
    buttonStyle: {
    },
    textStyle: {
    }
  },
  cardSectionStyle: {
    padding: 0,
    backgroundColor: 'transparent',
  },
  yKienStyle: {
    width: '100%',
    height: 55,
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BEBEBE',
  },
};

mapStateToProps = state => {
  const { isDanhGia } = state.osac;
  return { isDanhGia };
}

export default connect(mapStateToProps, { addDanhGia, setCanDanhGia })(DanhGiaScreen);
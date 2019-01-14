import React from 'react';
import { connect } from 'react-redux';
// import {  } from 'expo';
import {
  NetInfo,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Alert
} from 'react-native';
import Colors from '../constants/Colors';
import { windowWidth } from '../constants/Layout';
import { Button, CardSection, Card } from '../components/common';
import Question from '../components/DanhGiaComponent/Question';
import { addDanhGia, setCanDanhGia, onChangeValue } from '../containers/OSAC/OsacActions';
import { Card as _Card, Text } from 'react-native-elements';
import ThongBao from '../components/ThongBaoCompent';
import { INIT_QUESTIONS } from './../components/DanhGiaComponent';

const INTERNET_MESSAGE = "Không có kết nối";
const NGAY_CU_MESSAGE = "Vuốt màn hình xuống để lấy ngày mới";
const GUI_SUCCESS = 'Gửi thành công!';

class DanhGiaScreen extends React.Component {
  state = {
    refreshing: false,
    isConnected: true,
    imageWidth: 0,
    imageHeight: 0,
    // today: new Date('11/10/2011'),
    today: new Date(),
    isFocus: true,
    modalVisible: false,
    ...INIT_QUESTIONS,

  }

  componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  handleFirstConnectivityChange = (isConnected) => {
    this.setState({ isConnected })

  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  showDate = () => {
    const { today } = this.state;
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
  }

  onSubmit = () => {
    const { today } = this.state;
    const { addDanhGia, setCanDanhGia, onChangeValue } = this.props;
    const danhgia = {
      danhgiaId: `${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}`,
      datetime: `${this.state.today}`,
      question1: this.state.question1,
      question2: this.state.question2,
      question3: this.state.question3,
      question4: this.state.question4,
      yKien: this.state.yKien,
    }

    Alert.alert(
      'Phiếu Đánh Giá Căn Tin',
      `Xác nhận đánh giá ngày ${this.showDate()}`,
      [{ text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          setCanDanhGia(true);
          addDanhGia(danhgia);
          setTimeout(() => {
            onChangeValue('guiThanhCong', false);
          }, 5000)
        }
      }],
      { cancelable: true }
    )
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { isConnected } = this.state;
    const { isDanhGia, guiThanhCong } = this.props;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 80;
    const isOldDate = !this.compareDate(this.state.today, new Date());

    return (
      <View style={styles.container}>
        <ThongBao
          texts={[
            isConnected ? '' : INTERNET_MESSAGE,
            isOldDate ? NGAY_CU_MESSAGE : '',
            guiThanhCong ? GUI_SUCCESS : '',
          ]}
          visible={guiThanhCong || isOldDate || !isConnected}
        />
        <ScrollView
          style={styles.container}
          refreshControl={this.renderRefreshControl()}
        >
          <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center' }}
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior='position' enabled={this.state.isFocus}
            contentContainerStyle={this.state.isFocus ? { backgroundColor: '#fff' } : {}}
          >
            <_Card
              flexDirection={"row"}
              wrapperStyle={{
                justifyContent: 'space-between',
                alignItems: 'center', borderRadius: 10,
                backgroundColor: 'rgba(255,255,255,0.87)'
              }}
            >
              <Text style={{ fontSize: 25, color: Colors.osacColor, marginRight: 10 }}>Ngày</Text>
              <Text h4>{this.showDate()}</Text>
              <Button
                buttonStyle={{ flex: 1, alignItems: 'flex-end' }}
                onPress={this.onSubmit}
                disabled={isDanhGia || isOldDate}
              >Gửi</Button>
            </_Card>
            <Card style={[styles.backgroundWhite, { marginTop: 10 }]}>
              <Question question={this.state.question1} onChangeDanhGia={this.onChangeDanhGia} />
              <Question question={this.state.question2} onChangeDanhGia={this.onChangeDanhGia} />
              <Question question={this.state.question3} onChangeDanhGia={this.onChangeDanhGia} />
              <Question question={this.state.question4} onChangeDanhGia={this.onChangeDanhGia} />
              <CardSection style={[styles.cardSectionStyle, { justifyContent: 'space-around' }]}>
                <TextInput
                  style={styles.yKienStyle}
                  multiline numberOfLines={3}
                  maxLength={500}
                  placeholder='ý kiến của bạn để phục vụ tốt hơn'
                  autoCorrect={false}
                  onFocus={this._onFocus}
                  onEndEditing={this._onEndEditing}
                  value={this.state.yKien}
                  onChangeText={(yKien) => this.onChangeText({ yKien })}
                />
              </CardSection>
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
      </View >
    );
  }

  renderRefreshControl = () => {
    return <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
    />
  }
  _onRefresh = () => {
    const { today } = this.state;
    this.setState({ refreshing: true });
    setTimeout(() => {
      if (this.compareDate(today, new Date())) {
        this.setState({
          refreshing: false,
        });
      } else {
        this.setState({
          today: new Date(),
          refreshing: false,
          ...INIT_QUESTIONS,
        });
      }
    }, 1500)
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

  compareDate = (oldDate, today) => {
    const OldDay = `${oldDate.getDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
    const Today = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    return OldDay === Today;
  }
}

const styles = {
  container: {
    flex: 1,
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
  const { isDanhGia, guiThanhCong } = state.osac;
  return { isDanhGia, guiThanhCong };
}

export default connect(mapStateToProps, { addDanhGia, setCanDanhGia, onChangeValue })(DanhGiaScreen);
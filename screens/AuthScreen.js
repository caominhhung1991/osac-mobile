import React from 'react'
import { connect } from 'react-redux'
import { AppLoading } from 'expo';
import {
  View,
  Text,
  AsyncStorage,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { windowWidth } from './../constants/Layout'
import { bannerLogin, facebookIcon, googleIcon } from './../assets/images'
import bannerLoginPNG from './../assets/images/bannerLogin.png'
import Colors from './../constants/Colors';
import { Card, CardSection, Input, Button, Spinner } from '../components/common';
import * as actions from './../containers/OSAC/OsacActions';

class AuthScreen extends React.Component {
  state = {
    imageWidth: 0,
    imageHeight: 0,
    modalVisible: false,
  }

  componentDidMount() {
    const { width, height } = Image.resolveAssetSource(bannerLoginPNG);

    const scaleFactor = width / windowWidth;
    const imageHeight = height / scaleFactor;
    this.setState({
      imageWidth: windowWidth,
      imageHeight: imageHeight,
    })
  }

  render() {
    const { containerStyle, logoNameStyle, osacColor } = styles;
    const { imageHeight, imageWidth } = this.state;
    const { userToken, email, password, isLoadingComplete } = this.props;
    const { onChangeValue } = this.props;

    if (isLoadingComplete) {
      return (
        <Spinner />)
    }
    return [
      <Modal animationType='slide' visible={this.state.modalVisible} key="modalDangKy"
        onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
      >
        <Card style={{flex: 1, height: 300}}>
          <CardSection>
            <Input
              placeholder={'password'}
              label={'PASSWORD'}
              onChangeText={(value) => onChangeValue('password', value)}
              secureTextEntry
              value={password}
            />
          </CardSection>
          <CardSection>
            <Button onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>Đăng Ký</Button>
          </CardSection>
        </Card>
      </Modal>,
      < ScrollView style={containerStyle} key="dangky">
        <View style={styles.headerStyle}>
          <Image
            style={[styles.image, { height: imageHeight, width: imageWidth }]}
            source={bannerLogin}
          />
        </View>
        <Card>
          <CardSection>
            <Input
              placeholder={'example@gmail.com'}
              label={'EMAIL'}
              onChangeText={(value) => onChangeValue('email', value)}
              value={email}
            />
          </CardSection>
          <CardSection style={{ marginTop: 10 }}>
            <Input
              placeholder={'password'}
              label={'PASSWORD'}
              onChangeText={(value) => onChangeValue('password', value)}
              secureTextEntry
              value={password}
            />
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <Button onPress={this._signInAsync}>ĐĂNG NHẬP</Button>
          </CardSection>
          <CardSection style={{ alignSelf: 'center', paddingBottom: 3 }}>
            <Text>Bạn có tài khoản chưa? </Text>
            <TouchableOpacity>
            {/* <TouchableOpacity onPress={() => this.setModalVisible(true)}> */}
              <View><Text style={styles.signUpStyle}>Đăng Ký</Text></View>
            </TouchableOpacity>
          </CardSection>
          <CardSection style={{ alignSelf: 'center', paddingBottom: 0 }}>
            <TouchableOpacity><View><Text style={styles.signUpStyle}>Quên Password</Text></View></TouchableOpacity>
          </CardSection>
          <CardSection>
            <Text style={styles.lineStyle}></Text>
          </CardSection>
          <CardSection>
            <Button
              style={styles.facebookStyle}
              icon={facebookIcon}
            >Facebook</Button>
            <Button
              style={styles.googleStyle}
              icon={googleIcon}
            >Google</Button>
          </CardSection>
        </Card>
      </ScrollView >
    ]
  }

  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible })
  }

  _signInAsync = async () => {
    const { email, password, navigation } = this.props;
    const { loginUser, setIsLoadingComplete } = this.props;
    loginUser({ email, password, navigation });
    setIsLoadingComplete();
    // await AsyncStorage.setItem('userToken', 'abc');
  }
}

const styles = {
  isLoadingStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    flex: 1,
  },
  headerStyle: {
    position: 'relative'
  },
  osacColor: {
    color: Colors.osacColor,
  },
  lineStyle: {
    backgroundColor: Colors.osacColor,
    width: '97%',
    height: 1.5,
    marginLeft: 5,
    marginTop: 3,
  },
  signUpStyle: {
    fontWeight: 'bold',
    color: Colors.osacColor
  },
  facebookStyle: {
    buttonStyle: {
      backgroundColor: Colors.facebookColor,
      borderColor: Colors.facebookColor,
    }
  },
  googleStyle: {
    buttonStyle: {
      backgroundColor: '#fff',
      borderColor: Colors.googleColor
    },
    textStyle: {
      color: Colors.googleColor
    }
  },
  forgetPasswordStyle: {
    position: 'relative',
    top: 40,
    color: '#959595',
  }
}

const mapStateToProps = state => {
  const { userToken, email, password, isLoadingComplete } = state.osac;
  return { userToken, email, password, isLoadingComplete }
}

export default connect(mapStateToProps, actions)(AuthScreen)

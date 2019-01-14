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
import SignUp from '../components/SignUpComponent';

class AuthScreen extends React.Component {
  state = {
    imageWidth: 0,
    imageHeight: 0,
    isDangKy: false,
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
    const { imageHeight, imageWidth, isDangKy } = this.state;
    const { userToken, username, password, isLoadingComplete } = this.props;
    const { onChangeValue } = this.props;

    if (isLoadingComplete) {
      return (
        <Spinner />)
    }
    return [
      <SignUp
        key="modalDangKy"
        dangKyHandle={this.dangKyHandle}
        isDangKy={isDangKy}
        {...this.props}
      />
      ,
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
              placeholder={'username'}
              label={'USERNAME'}
              onChangeText={(value) => onChangeValue('username', value)}
              value={username}
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

        <View style={{marginTop: 10}}>
          <Button onPress={this._signInAsync}>ĐĂNG NHẬP</Button>
        </View>

        <Card>
          <CardSection style={{ alignSelf: 'center', paddingBottom: 3 }}>
            <Text>Bạn có tài khoản chưa? </Text>
            <TouchableOpacity onPress={() => this.dangKyHandle(true)}>
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
            {/* <Button
              style={styles.facebookStyle}
              icon={facebookIcon}
            >Facebook</Button>
            <Button
              style={styles.googleStyle}
              icon={googleIcon}
            >Google</Button> */}
          </CardSection>
        </Card>
      </ScrollView >
    ]
  }

  dangKyHandle = (value) => {
    this.setState({
      isDangKy: value
    })
  }

  _signInAsync = async () => {
    const { username, password, navigation } = this.props;
    const { loginUser, setIsLoadingComplete } = this.props;
    setIsLoadingComplete();
    loginUser({ username, password, navigation });
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
  const { userToken, username, password, isLoadingComplete } = state.osac;
  return { userToken, username, password, isLoadingComplete }
}

export default connect(mapStateToProps, actions)(AuthScreen)

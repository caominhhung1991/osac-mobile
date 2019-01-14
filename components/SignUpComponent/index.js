import React from 'react'
import firebase from 'firebase';
import { isEmpty } from 'lodash';
import { Modal, Alert, View, KeyboardAvoidingView, Platform, AsyncStorage } from 'react-native';
import { Text, Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import danhgia from '../../assets/images/danhgia.png';
import styles from './SignUpStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from './../common';
import RNPickerSelect from 'react-native-picker-select';
import { CONG_TYS } from '../SettingsComponent/SettingsContants';
import { addUser, checkUserTonTai } from '../../services/OsacService';
import { REG_TV } from '../../constants/OsacContants';

class SignUp extends React.Component {
  state = {
    xemPassword: true,
    loading: false,
    congtys: CONG_TYS,
    userInfo: {
      hoten: '',
      username: '',
      password: '',
      phone: '',
      congty: 'Jabil Vietnam',
      bophan: 'Sản xuất',
      calamviec: 'Sáng',
      tangca: true,
    },
  }
  render() {
    const { xemPassword, congtys, userInfo } = this.state;
    const { isDangKy } = this.props;
    const { dangKyHandle } = this.props;
    const requiredText = <Text style={{ color: 'red' }}>*</Text>;
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : -300;
    const onChangeUserInfo = this.onChangeUserInfo;
    return (
      <Modal animationType='slide' visible={isDangKy}
        onRequestClose={() => { Alert.alert('Modal has been closed.'); }}
      >
        <ScrollView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior='position'
          >
            <Card
              {...styles.cardStyles}
              featuredTitle='Tạo tài khoản'
              image={danhgia}
            >
              <View>
                <FormLabel>USERNAME {requiredText}</FormLabel>
                <FormInput
                  placeholder="username"
                  value={userInfo.username}
                  onChangeText={(text) => { onChangeUserInfo('username', text) }}
                  autoCapitalize='none'
                  ref={(ref) => { this.usernameRef = ref; }}
                  maxLength={40}
                  onEndEditing={() => this.password.focus()}
                />
                {/* <FormValidationMessage>Error message</FormValidationMessage> */}
              </View>
              <View>
                <FormLabel>PASSWORD {requiredText}</FormLabel>
                <FormInput
                  secureTextEntry={!xemPassword}
                  placeholder="password ít nhất 4 ký tự"
                  value={userInfo.password}
                  onChangeText={(text) => { onChangeUserInfo('password', text) }}
                  autoCapitalize='none'
                  ref={(ref) => { this.password = ref; }}
                  maxLength={40}
                />
                <Button outline {...styles.buttonStyles}
                  onPress={() => this.setState({ xemPassword: !xemPassword })}
                >{xemPassword ? `Ẩn password` : `Xem password`}</Button>
              </View>
              <View key={'congty'}>
                <FormLabel>CÔNG TY</FormLabel>
                <RNPickerSelect
                  placeholder={{ label: 'chọn công ty', value: null, color: '#9EA0A4', }}
                  items={congtys.items}
                  onValueChange={(text) => { onChangeUserInfo('congty', text) }}
                  style={{ ...styles.pickerSelectStyles }}
                  value={userInfo.congty}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
              <View key={'bophan'}>
                <FormLabel>BỘ PHẬN:</FormLabel>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                  <Button
                    outline={!(userInfo.bophan === 'Hành chính')}
                    onPress={() => onChangeUserInfo('bophan', 'Hành chính')}
                    {...styles.buttonBoPhanStyles}>Hành chính</Button>
                  <Button
                    outline={!(userInfo.bophan === 'Sản xuất')}
                    onPress={() => onChangeUserInfo('bophan', 'Sản xuất')}
                    {...styles.buttonBoPhanStyles}>Sản xuất</Button>
                </View>
              </View>

              {
                userInfo.bophan === 'Sản xuất' ?
                  <View key={'calamviec'}>
                    <FormLabel>CA LÀM VIỆC:</FormLabel>
                    <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                      <Button
                        outline={!(userInfo.calamviec === 'Sáng')}
                        onPress={() => onChangeUserInfo('calamviec', 'Sáng')}
                        {...styles.buttonCaLamViecStyles}>Sáng</Button>
                      <Button
                        outline={!(userInfo.calamviec === 'Tối')}
                        onPress={() => onChangeUserInfo('calamviec', 'Tối')}
                        {...styles.buttonCaLamViecStyles}>Tối</Button>
                      <Button
                        outline={!userInfo.tangca}
                        onPress={() => onChangeUserInfo('tangca', !userInfo.tangca)}
                        {...styles.buttonCaLamViecStyles}>Tăng ca</Button>
                    </View>
                  </View>
                  : null
              }

              <View>
                <FormLabel>({requiredText}) bắt buộc nhập</FormLabel>
              </View>

            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <Button {...styles.buttonDongStyles} outline
            onPress={() => dangKyHandle(false)}
          >Đóng</Button>
          <Button {...styles.buttonDongStyles}
            // disabled={this.state.loading}
            loading={this.state.loading}
            onPress={() => this.onSubmit()}
          >Đăng ký</Button>
        </View>
      </Modal>
    )
  }

  onSubmit = async () => {
    const { userInfo } = this.state;
    const { dangKyHandle, navigation } = this.props;
    if (!this.checkValidText(userInfo.username)) {
      Alert.alert('username chưa đúng');
      this.usernameRef.focus();
      return;
    }

    if (!this.checkValidText(userInfo.password) || userInfo.password.length < 4) {
      Alert.alert('password chưa đúng');
      this.password.focus();
      return;
    }
    this.setState({ loading: true })

    const isUserTonTai = await checkUserTonTai(userInfo.username);
    if (isUserTonTai) {
      Alert.alert('username đã tồn tại');
      this.setState({ loading: false })
      this.usernameRef.focus();
    } else {
      addUser(userInfo).then(() => {
        this.setState({ loading: false })
        AsyncStorage.setItem('userToken', userInfo.username);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        dangKyHandle(false);
        navigation.navigate('DanhGia')
      });
    }
  }

  onChangeUserInfo = (prop, value) => {
    const { userInfo } = this.state;
    if (value === null) {
      return;
    }
    this.setState({
      userInfo: {
        ...userInfo,
        [prop]: value,
      }
    });
  }

  checkValidText = (text) => {
    const newText = text.trim();
    if (isEmpty(newText) || newText.indexOf(' ') >= 0) {
      return false;
    }
    for (const key of text) {
      if (REG_TV.test(key)) {
        return false;
      }
    }
    return true;
  }
}

export default SignUp;

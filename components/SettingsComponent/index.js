import React, { Component } from 'react'
import { View, ScrollView, Image, AsyncStorage, Alert } from 'react-native';
import PropTypes from 'prop-types'
import { Card, Text, Avatar } from 'react-native-elements';
import { Button } from './../common';
import styles from './SettingsStyles';
import Colors from '../../constants/Colors';
import { jabilLogo } from '../../assets/images';
import EditInfo from './EditInfo';
import { CONG_TYS, IMAGES_CONG_TY } from './SettingsContants'
import { updateUser } from '../../services/OsacService';

const LABEL_SELECT_CONGTY = 'Chọn tên công ty...';

export class Settings extends Component {
  state = {
    editing: false,
    userInfo: {
      hoten: 'Cao Minh Hưng',
      phone: '0798815991',
      congty: 'Jabil Vietnam',
      bophan: 'Sản xuất',
      calamviec: 'Sáng',
      tangca: true,
    },
    congtys: CONG_TYS
  }

  componentDidMount() {
    AsyncStorage.getItem('userInfo').then(res => {
      const userInfo = JSON.parse(res);
      this.setState({ userInfo: userInfo })
    })
  }

  render() {
    const { editing, userInfo, congtys } = this.state;
    const btnSuaText = editing ? 'Lưu thay đổi' : 'Cập nhật';
    return (
      <View style={{ flex: 1 }}>
        <ScrollView opacity={editing ? 1 : 0.75}>
          <Card containerStyle={styles.containerStyle} wrapperStyle={styles.wrapperStyle}>
            <View style={[styles.titleStyle, { borderTopWidth: 0 }]}>
              <Avatar
                containerStyle={{ marginRight: 10 }}
                medium rounded
                title="AV"
              // source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg" }}
              />
              <View>
                <Text style={{ color: Colors.googleColor }}>{userInfo.username}</Text>
                <Image style={{ marginTop: 5, width: 75, height: 15 }} source={IMAGES_CONG_TY[userInfo.congty]} />
              </View>
            </View>
            <View style={styles.titleStyle}>
              <Text h4 style={{ fontSize: 23, fontWeight: 'bold' }}>Thông tin cá nhân </Text>
              <Button
                outline={!editing}
                {...styles.buttonStyle}
                onPress={() => this.suaHandle({ editing })}>{btnSuaText}</Button>
            </View>

            <EditInfo editing={editing} userInfo={userInfo} congtys={congtys}
              labelPicker={LABEL_SELECT_CONGTY}
              onChangeUserInfo={this.onChangeUserInfo}
            />
          </Card>
        </ScrollView>
        <View style={[styles.dangXuatStyle]}>
          <Button containerViewStyle={{ width: '100%' }} onPress={this.dangXuat}>Đăng xuất</Button>
        </View>
      </View>

    )
  }

  suaHandle = ({ editing }) => {
    const { userInfo } = this.state;
    if (editing) {
      Alert.alert(
        'Thông tin tài khoản',
        `Xác nhận lưu thay đổi`,
        [{ text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.onSubmit();
          }
        },
        {
          text: 'Huỷ thay đổi',
          onPress: () => {
            AsyncStorage.getItem('userInfo').then(res => {
              const userInfo = JSON.parse(res);
              this.setState({ userInfo: userInfo, editing: false })
            })
          }
        },
        ],
        { cancelable: true }
      )
    } else {
      this.setState({ editing: true });
    }

  }

  onSubmit = async () => {
    const result = await updateUser(this.state.userInfo);
    if (result) {
      this.setState({ editing: false });
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

  dangXuat = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
    } catch (error) {
      console.log(error);
    }

  }
}

Settings.propTypes = {

};

export default Settings

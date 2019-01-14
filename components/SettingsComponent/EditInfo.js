import React from 'react'
import PropTypes from 'prop-types'
import { View, Picker } from 'react-native';
import { Text, FormInput } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { Button } from './../common';
import styles from './SettingsStyles';

const EditInfo = (props) => {
  const { editing, userInfo, congtys, labelPicker } = props;
  const { onChangeUserInfo } = props;
  if (editing) {
    return [
      <View key={'hoten'} style={[styles.titleStyle, styles.titleEditingStyle]}>
        <Text style={styles.propInput}>Họ tên:</Text>
        <FormInput
          containerStyle={{ borderBottomWidth: 0 }}
          inputStyle={[styles.propInputText]}
          value={userInfo.hoten}
          onChangeText={(text) => { onChangeUserInfo('hoten', text) }}
        />
      </View>,

      <View key={'sodienthoai'} style={[styles.titleStyle, styles.titleEditingStyle]}>
        <Text style={styles.propInput}>Số điện thoại:</Text>
        <FormInput
          containerStyle={{ borderBottomWidth: 0 }}
          inputStyle={[styles.propInputText]}
          value={userInfo.phone}
          onChangeText={(text) => { onChangeUserInfo('phone', text) }}
        />
      </View>,

      <View key={'congty'} style={[styles.titleStyle, styles.titleEditingStyle]}>
        <Text style={styles.propInput}>Công ty:</Text>
        <RNPickerSelect
          placeholder={{ label: labelPicker, value: null, color: '#9EA0A4', }}
          items={congtys.items}
          onValueChange={(text) => { onChangeUserInfo('congty', text) }}
          style={{ ...styles.pickerSelectStyles }}
          value={userInfo.congty}
          useNativeAndroidPickerStyle={false}
        />
      </View>,

      <View key={'bophan'} style={styles.titleStyle}>
        <Text style={styles.propInput}>Bộ phận:</Text>
        <Button
          outline={!(userInfo.bophan === 'Hành chính')}
          onPress={() => onChangeUserInfo('bophan', 'Hành chính')}
          {...styles.buttonStyle}>Hành chính</Button>
        <Button
          outline={!(userInfo.bophan === 'Sản xuất')}
          onPress={() => onChangeUserInfo('bophan', 'Sản xuất')}
          {...styles.buttonStyle}>Sản xuất</Button>
      </View>,
      userInfo.bophan === 'Sản xuất' ? [<View key={'calamviec'} style={[styles.titleStyle]}>
        <Text style={styles.propInput}>Ca làm việc:</Text>
        <Button
          outline={!(userInfo.calamviec === 'Sáng')}
          onPress={() => onChangeUserInfo('calamviec', 'Sáng')}
          {...styles.buttonStyle}>Sáng</Button>
        <Button
          outline={!(userInfo.calamviec === 'Tối')}
          onPress={() => onChangeUserInfo('calamviec', 'Tối')}
          {...styles.buttonStyle}>Tối</Button>
        <Button
          outline={!userInfo.tangca}
          onPress={() => onChangeUserInfo('tangca', !userInfo.tangca)}
          {...styles.buttonStyle}>Tăng ca</Button>
      </View>] : null
    ]
  }

  return [
    <View key={'hoten'} style={styles.titleStyle}>
      <Text style={styles.propInput}>Họ tên:</Text>
      <Text style={styles.propInputText}>
        {userInfo.hoten}
      </Text>
    </View>,
    <View key={'sodienthoai'} style={styles.titleStyle}>
      <Text style={styles.propInput}>Số điện thoại:</Text>
      <Text style={styles.propInputText}>{userInfo.phone}</Text>
    </View>,
    <View key={'congty'} style={styles.titleStyle}>
      <Text style={styles.propInput}>Công ty:</Text>
      <Text style={styles.propInputCompany}>{userInfo.congty}</Text>
    </View>,
    <View key={'bophan'} style={styles.titleStyle}>
      <Text style={styles.propInput}>Bộ phận:</Text>
      <Button
        outline={!(userInfo.bophan === 'Hành chính')}
        {...styles.buttonStyle}>Hành chính</Button>
      <Button
        outline={!(userInfo.bophan === 'Sản xuất')}
        {...styles.buttonStyle}>Sản xuất</Button>
    </View>,
    userInfo.bophan === 'Sản xuất' ?
      [<View key={'calamviec'} style={[styles.titleStyle]}>
        <Text style={styles.propInput}>Ca làm việc:</Text>
        <Button
          outline={(!userInfo.calamviec === 'Sáng')}
          {...styles.buttonStyle}>Sáng</Button>
        <Button
          outline={!(userInfo.calamviec === 'Tối')}
          {...styles.buttonStyle}>Tối</Button>
        <Button
          outline={!userInfo.tangca}
          {...styles.buttonStyle}>Tăng ca</Button>
      </View>] : null
  ];
}

EditInfo.propTypes = {
  labelPicker: PropTypes.string.isRequired,
  editing: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  congtys: PropTypes.object.isRequired,
  onChangeUserInfo: PropTypes.func.isRequired,
}

export default EditInfo


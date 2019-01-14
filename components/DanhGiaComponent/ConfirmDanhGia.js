import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-native';

const ConfirmDanhGia = (props) => {
  const { showDate } = props;
  const { setCanDanhGia, addDanhGia, onChangeValue} = props;
  return (
    Alert.alert(
      'Phiếu Đánh Giá Căn Tin',
      `Xác nhận đánh giá ngày ${showDate}`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            setCanDanhGia(true);
            addDanhGia(danhgia);
            setTimeout(() => {
              onChangeValue('guiThanhCong', false);
            }, 5000)
          }
        },
      ],
      { cancelable: true }
    )
  )
}

ConfirmDanhGia.propTypes = {
  showDate: PropTypes.string.isRequired,
  setCanDanhGia: PropTypes.func.isRequired,
  addDanhGia: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
}

export default ConfirmDanhGia

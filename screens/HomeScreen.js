import React from 'react';
import { ScrollView, TouchableOpacity, Text, AsyncStorage, View } from 'react-native';
import { Button, Card, CardSection } from './../components/common'

import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => {
  //   return {
  //     // header
  //     headerRight: (
  //       <TouchableOpacity>
  //         <Text
  //           style={styles.leftStyle}
  //           onPress={() => navigation.navigate('DanhGia')}
  //           title="Đánh Giá"
  //         >Đánh Giá</Text>
  //       </TouchableOpacity>
  //     ),
  //   }
  // }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.containerStyle}>
        <Text>Thực đơn đang cập nhật.</Text>
        <Text>Chuyển sang:</Text>
        {/* <Card> */}
          <CardSection>
            <Button onPress={() => navigation.navigate('DanhGia')}>Đánh giá căn tin</Button>
            <Button onPress={() => navigation.navigate('Settings')}>Tài khoản</Button>
          </CardSection>
        {/* </Card> */}
      </View>
      // <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //   <Card>
      //     <CardSection style={styles.logOutStyle}>
      //       <Button onPress={this._signOutAsync} >Log Out To TEST</Button>
      //     </CardSection>
      //   </Card>
      // </ScrollView>
    );
  }

  showMoreApp = () => {
    this.props.navigation.navigate('DanhGia');
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('AuthLoading')
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  leftStyle: {
    color: Colors.osacColor,
    fontSize: 18,
    marginRight: 10,
  },
  logOutStyle: {
    // top: 100,
  }
};

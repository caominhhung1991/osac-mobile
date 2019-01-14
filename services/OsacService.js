import firebase from 'firebase'
import { isEmpty } from 'lodash'
// const addUserURL = `/users/${currentUser.uid}/employees/${uid}`;
// api for users: /users/{username}
import { AsyncStorage } from 'react-native';

export const addDanhGia = (danhgia) => {
  console.log(danhgia)
}

export const addUser = async (userInfo) => {
  const url = `/users/${userInfo.username}`;
  await firebase.database().ref(url).set(userInfo);
  return true;
}

export const updateUser = async (userInfo) => {
  const url = `/users/${userInfo.username}`;
  await firebase.database().ref(url).set(userInfo);
  AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
  return true;
}

export const checkUserTonTai = async (username) => {
  const url = `/users/${username}`;
  const snapshot = await firebase.database().ref(url).once('value');
  return !isEmpty(snapshot.val());
}

export const checkAuth = async ({username, password}) => {
  const url = `/users/${username}`;
  const snapshot = await firebase.database().ref(url).once('value');
  const val = snapshot.val();
  if(val && val.password === password) {
    AsyncStorage.setItem('userToken', val.username);
    AsyncStorage.setItem('userInfo', JSON.stringify(val));
    return true;
  }
  return false;
}

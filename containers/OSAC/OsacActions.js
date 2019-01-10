import firebase from 'firebase';

import {
  ON_CHANGE_VALUE,
  SET_LOADING_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_OUT,
  LOG_IN,
  ADD_DANHGIA_START,
  ADD_DANHGIA_SUCCESS,
  ADD_DANHGIA_FAIL,
  SET_CAN_DANHGIA,
} from './OsacTypes';
import { AsyncStorage } from 'react-native';

export const onChangeValue = (name, value) => {
  return {
    type: ON_CHANGE_VALUE,
    payload: { name, value },
  }
}

export const logOut = () => {
  firebase.auth().signOut();
  return {
    type: LOG_OUT,
  }
}

export const setIsLoadingComplete = () => {
  return {
    type: SET_LOADING_START
  }
}

export const loginUser = ({ email, password, navigation }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => loginUserSuccess(dispatch, user, navigation))
      .catch((err) => {
        console.log(err)
        loginUserFail(dispatch);
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(loginUserSuccess)
        // .catch(this.onLoginFail)
      })
  }
}

const loginUserSuccess = (dispatch, user, navigation) => {
  AsyncStorage.setItem('userToken', user.user.uid)
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { user }
  })

  navigation.navigate('DanhGia');
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  })
}

export const addDanhGia = (danhgia) => {
  const { currentUser } = firebase.auth();
  console.log(danhgia)
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/danhgias/${danhgia.danhgiaId}`)
      .set(danhgia)
      .then(() => {
        dispatch({ type: ADD_DANHGIA_SUCCESS })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: ADD_DANHGIA_FAIL })
      })
  }
}

export const setCanDanhGia = (value) => {
  return {
    type: SET_CAN_DANHGIA,
    payload: value,
  }
}

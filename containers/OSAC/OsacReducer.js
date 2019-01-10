import {
  ON_CHANGE_VALUE,
  SET_LOADING_START,
  LOG_OUT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOG_IN_USER,
  ADD_DANHGIA_SUCCESS,
  ADD_DANHGIA_FAIL,
  SET_CAN_DANHGIA,
} from './OsacTypes'

const initState = {
  email: 'hung@gmail.com',
  password: 'Hung1991',
  loggedIn: null,
  userToken: null,
  isLoadingComplete: false,
  isDanhGia: false,
  danhGiaDate: '',
}

export default (state = initState, action) => {
  switch (action.type) {
    case ON_CHANGE_VALUE:
      return { ...state, [action.payload.name]: action.payload.value };
    case SET_LOADING_START:
      return { ...state, isLoadingComplete: true }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...action.payload, isLoadingComplete: false };
    case LOGIN_USER_FAIL:
      return { ...state, ...action.payload, isLoadingComplete: false };
    case LOG_OUT:
      return { ...state, password: '' };
    case ADD_DANHGIA_SUCCESS:
      return { ...state, isDanhGia: true };
    case ADD_DANHGIA_FAIL:
      return { ...state, isDanhGia: false  };
    case SET_CAN_DANHGIA:
      return { ...state, isDanhGia: action.payload };
    default:
      return state;
  }
}
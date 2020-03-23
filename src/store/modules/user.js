const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const initState = {
  userInfo: {
    name: '',
    password: '',
    phone: '',
    type: '',
    avatar: '',
    create_time: '',
    update_time: '',
    __v: 0,
    _id: '',
  },
    message: '',
   isAuth: false
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: '',
        message: action.payload.message,
      }
    case LOGOUT:
      return {
        userInfo: '',
        message: ''
      }
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        userInfo: '',
        message: action.payload,
      }
    default:
      return state
  }
}

export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
}

export function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
}

export function registerFailue(data) {
  return {
    type: REGISTER_FAILURE,
    payload: data,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
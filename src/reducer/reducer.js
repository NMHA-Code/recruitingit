// reducer/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  CHECK_AUTHEN
} from '../action/index.js';

const initialState = {
  user: null,
  authenticated: false,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload || null,
        authenticated: !!action.payload,
        error: null
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || 'Có lỗi xảy ra',
        user: null,
        authenticated: false
      };

    case CHECK_AUTHEN:
      return {
        ...state,
        authenticated: !!action.payload
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        authenticated: false,
        loading: false,
        error: null
      };

    default:
      return state;
  }
}

// action/index.js
import { ganeratorToken } from "../helpers/Token/ganerator";
import { GetCompany, PostCompany } from "../service/CompanyService";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CHECK_AUTHEN = 'CHECK_AUTHEN';

export const login = (email, password) => {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const data = await GetCompany() || [];
      const found = data.filter(u => u.email === email && u.password === password);

      if (found.length === 0) {
        dispatch({ type: LOGIN_FAILURE, payload: 'Email hoặc mật khẩu không đúng' });
        return []; 
      }
      dispatch({ type: LOGIN_SUCCESS, payload: found[0] });
      return found;
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message || 'Lỗi hệ thống' });
      return []; // trả về mảng rỗng khi lỗi
    }
  };
};

export const register = (companyName, email, password) => {
  return async dispatch => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const data = await GetCompany() || [];
      const found = data.find(u => u.email === email);
      if (found) {
        dispatch({ type: REGISTER_FAILURE, payload: 'Email exists' });
        throw new Error('Email exists');
      }
      const token = ganeratorToken();
      const object = { token, companyName, email, password };
      const created = await PostCompany(object);
      dispatch({ type: REGISTER_SUCCESS, payload: created || object });
      return created || object;
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
      throw error;
    }
  };
};

export const logout = () => ({ type: LOGOUT });

export const checkAuthen = (flag) => ({ type: CHECK_AUTHEN, payload: !!flag });

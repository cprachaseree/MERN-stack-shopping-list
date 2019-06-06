import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

// Register User
export const register = ({ name, email, password }) => dispatch => {
  // headers for the json post request
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // Request body that will be sent
  const body = JSON.stringify({ name, email, password });

  // make request
  axios.post('/api/users', body, config)
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login user
export const login = ({ email, password }) => dispatch => {
  // headers for the json post request
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // Request body that will be sent
  const body = JSON.stringify({ email, password });

  // make request
  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout user
export const logout = ()  =>{
  return {
    type: LOGOUT_SUCCESS
  };
};

// Check token and load user
// make request to api/user
export const loadUser = () => (dispatch, getState) => {
  // User loading USER_LOADING in authReducer
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
  });
};

// setup config/header and token
export const tokenConfig = getState => {
  // get token from local storage
  const token = getState().auth.token;

  // headers
  const config ={
    headers: {
      "Content-type": "application/json"
    }
  };

  // if there is a token, add to headers
  if(token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

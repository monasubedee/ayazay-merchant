import {
  SET_MERCHANT_USER, SET_MERCHANT_LOGIN,
} from './merchant.type';

import {
  GET_MERCHANT,
  FIRST_REGISTER_MERCHANT,
  SET_MERCHANT_PH_LOGIN,
  POST_MERCHANT_UPDATE_PASSWORD_ERROR,
  POST_MERCHANT_UPDATE_PASSWORD,
  GET_MERCHANT_ERROR,
  CLEAN_MESSAGE,
  FORGET_PASSWORD
} from '../types';

const INITIAL_STATE = {
  merchantUser: {
    merchant_name: '',
    email: '',
    merchant_ph_no: '',
    merchant_staff_qty: '',
    merchant_remark: '',
    merchant_code: '',
    merchant_nrc: '',
    company_license: '',
    merchant_id: '',
    merchant_status: '',
  },
  submitSuccess: false,
  login: {
    phLogin: '',
    merchantLogin: '',
    token: '',
  },
  register: {},
  status: '',
  forgetPassword: {},
  error: null,
};

const merchantReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MERCHANT_USER:
      return {
        ...state,
        merchantUser: action.payload,
        error: null,
      };
    case GET_MERCHANT:
      return {
        ...state,
        merchantUser: action.payload,
        submitSuccess: true,
        error: null,
      };
    case SET_MERCHANT_LOGIN:
      return {
        ...state,
        login: { ...state.merchantLogin, ...action.payload },
        error: null,
      };
    case SET_MERCHANT_PH_LOGIN:
      return {
        ...state,
        login: { ...action.payload },
        error: null,
      };

    case FIRST_REGISTER_MERCHANT:
      return {
        ...state,
        register: { ...action.payload },
        error: null,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        forgetPassword: { ...action.payload },
        error: null,
      };
    case POST_MERCHANT_UPDATE_PASSWORD:
      return {
        ...state,
        status: 'Success'
      }
    case POST_MERCHANT_UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        status: 'Error'
      }
    case CLEAN_MESSAGE:
      return {
        ...state,
        status: ''
      }
    case GET_MERCHANT_ERROR:
      return { ...state, error: 'Try Again' };
    default:
      return state;
  }
};

export default merchantReducer;

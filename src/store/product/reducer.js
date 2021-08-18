import {
  GET_PRODUCT_LOADING, STORE_SHOP_ID,
} from './type';

import {
  GET_MERCHANT_PRODUCTS,
  POST_PRODUCT_ERROR,
  POST_PRODUCT,
  GET_SHOP_ID_PRODUCTS_ID,
  GET_SHOP_ID_PRODUCTS_ID_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  CLEAN_MESSAGE
} from '../types';

const INIT_STATE = {
  products: [],
  product: {},
  loading: false,
  itemlength: 0,
  productList: [],
  successCreate: null,
  errorMessage: '',
  status: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // {"status":"Success","message":"Create product successful"}
    case POST_PRODUCT:
      return { ...state, successCreate: action.payload.message, errorMessage: null };
    case POST_PRODUCT_ERROR:
      return { ...state, successCreate: null, errorMessage: action.payload.message };
    case GET_MERCHANT_PRODUCTS:
      return {
        ...state, productList: [...action.payload.shops], itemlength: action.payload.length, loading: false,
      };
    case GET_PRODUCT_LOADING:
      return { ...state, loading: true };
    case GET_SHOP_ID_PRODUCTS_ID:
      return { ...state, product: action.payload };
    case GET_SHOP_ID_PRODUCTS_ID_ERROR:
      return { ...state, status: 'Error' };
    case CLEAN_MESSAGE:
      return { ...state, successCreate: null, status: '' }
    case STORE_SHOP_ID:
      return { ...state, storeShopId: action.payload };
    case DELETE_PRODUCT:
      return { ...state, status: 'Success' };
    case DELETE_PRODUCT_ERROR:
      return { ...state, status: 'Error' };
    default:
      return state;
  }
};

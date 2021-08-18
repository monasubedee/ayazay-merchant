import {
  NEW_PRODUCT_INFO, NEW_PRODUCT_VARIANTS, CREATE_NEW_PRODUCT, CREATE_NEW_PRODUCT_ERROR, GET_ALL_PRODUCT_LIST, GET_PRODUCT_LOADING, STORE_SHOP_ID,
} from './type';
import api from '../../constants/api';

export const getProductInfoUpdate = (data) => (dispatch) => {
  console.log('data', data);
  dispatch({
    type: NEW_PRODUCT_INFO,
    payload: data,
  });
};

export const getProductAll = () => async (dispatch) => {
  const response = await api.get('/merchant/products');

  dispatch({
    type: GET_ALL_PRODUCT_LIST,
    payload: (response.data.length > 0
      && response.data[0].shops.length > 0
      && response.data[0].shops[0].products.length > 0
    ) ? response.data[0].shops : [],
  });
};

export const getVariantUpdate = (data) => (dispatch) => {
  dispatch({
    type: NEW_PRODUCT_VARIANTS,
    payload: data,
  });
};

export const getStoreShopId = (data) => (dispatch) => {
  dispatch({
    type: STORE_SHOP_ID,
    payload: data,
  });
};

export const createNewProduct = (shopId, data) => async (dispatch) => {
  const response = await api.post(`/shop/${shopId}/product`, data);
  try {
    dispatch(getProductAll());
    dispatch({
      type: CREATE_NEW_PRODUCT,

      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_PRODUCT_ERROR,
      payload: response.data,
    });
  }
};

export const getProductLoading = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_LOADING,
  });
};

import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import {
  GET_MERCHANT,
  GET_MERCHANT_URL,
  GET_MERCHANT_ERROR,
  POST_SHOP,
  POST_SHOP_URL,
  POST_SHOP_ERROR,
  GET_SHOPS,
  GET_SHOPS_URL,
  GET_SHOPS_ERROR,
  GET_SHOP_ID,
  GET_SHOP_ID_URL,
  GET_SHOP_ID_ERROR,
  UPDATE_SHOP,
  UPDATE_SHOP_ERROR,
  CLEAN_MESSAGE,
  GET_BRAND,
  GET_BRAND_ERROR,
  GET_BRAND_URL,
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
  GET_CATEGORY_URL,
  GET_SUB_CATEGORY,
  GET_SUB_CATEGORY_ERROR,
  GET_ISSUE_LIST,
  ISSUE_LIST_ERROR,
  GET_ISSUE_LIST_URL,
  GET_SHOP_ID_PRODUCTS_ID,
  GET_SHOP_ID_PRODUCTS_ID_ERROR,
  GET_MERCHANT_PRODUCTS_URL,
  GET_MERCHANT_PRODUCTS_ERROR,
  GET_MERCHANT_PRODUCTS,
  POST_MERCHANT_UPDATE_PASSWORD_URL,
  POST_MERCHANT_UPDATE_PASSWORD,
  POST_MERCHANT_UPDATE_PASSWORD_ERROR,

  POST_PRODUCT,
  POST_PRODUCT_ERROR,
  POST_PRODUCT_URL,

  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_URL


} from '../store/types';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();


  const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER
  });

  api.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      config.headers.Language = 'English';
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
        authContext.logout();
        enqueueSnackbar('Token Expired!', { variant: 'success' });
      }
      return Promise.reject(error);
    }
  );

  const getMerchant = () => [
    api.get(GET_MERCHANT_URL),
    GET_MERCHANT,
    GET_MERCHANT_ERROR
  ];

  const createShop = data => [
    api.post(POST_SHOP_URL, data),
    POST_SHOP,
    POST_SHOP_ERROR
  ];

  const getShops = () => [api.get(GET_SHOPS_URL), GET_SHOPS, GET_SHOPS_ERROR];

  const getShopWithId = id => [
    api.get(`${GET_SHOP_ID_URL}/${id}`),
    GET_SHOP_ID,
    GET_SHOP_ID_ERROR
  ];

  const updateShop = data => [
    api.put(`${GET_SHOP_ID_URL}/${data.id}`, data),
    UPDATE_SHOP,
    UPDATE_SHOP_ERROR
  ];

  const cleanEthic = () => ['CLEAN', CLEAN_MESSAGE, 'CLEAN'];

  const getCategory = () => [
    api.get(GET_CATEGORY_URL),
    GET_CATEGORY,
    GET_CATEGORY_ERROR
  ];

  const getBrands = () => [api.get(GET_BRAND_URL), GET_BRAND, GET_BRAND_ERROR];

  const getSubCategory = id => [
    api.get(`${GET_CATEGORY_URL}/${id}/subcategories`),
    GET_SUB_CATEGORY,
    GET_SUB_CATEGORY_ERROR
  ];
  // GET ISSUELIST
  const getIssueList = (email) => [
    api.get(`${GET_ISSUE_LIST_URL}?email=${email}`),
    GET_ISSUE_LIST,
    ISSUE_LIST_ERROR
  ]

  const getMerchantProducts = () => [
    api.get(GET_MERCHANT_PRODUCTS_URL),
    GET_MERCHANT_PRODUCTS,
    GET_MERCHANT_PRODUCTS_ERROR
  ]

  const postShopByProduct = (id, data) => [
    api.post(POST_PRODUCT_URL.replace(':id', id), data),
    POST_PRODUCT,
    POST_PRODUCT_ERROR
  ]

  const getShopIdProduct = (sId, pId) => [
    api.get(`/shop/${sId}/product/${pId}`),
    GET_SHOP_ID_PRODUCTS_ID,
    GET_SHOP_ID_PRODUCTS_ID_ERROR
  ]
  const postMerchantUpdatePassword = (data) => [
    api.post(POST_MERCHANT_UPDATE_PASSWORD_URL, data),
    POST_MERCHANT_UPDATE_PASSWORD,
    POST_MERCHANT_UPDATE_PASSWORD_ERROR
  ]

  const productDelete = (id) => [
    api.delete(DELETE_PRODUCT_URL.replace(':id', id)),
    DELETE_PRODUCT,
    DELETE_PRODUCT_URL
  ]

  return (
    <Provider
      value={{
        getMerchant,

        createShop,
        getShops,
        getShopWithId,
        updateShop,
        cleanEthic,

        getCategory,
        getBrands,

        getSubCategory,

        getIssueList,
        getMerchantProducts,
        postShopByProduct,
        getShopIdProduct,
        postMerchantUpdatePassword,
        productDelete
      }}
    >
      {children}
    </Provider>
  );
};

const routWithFetchProvider = withRouter(FetchProvider);

export { FetchContext, routWithFetchProvider };

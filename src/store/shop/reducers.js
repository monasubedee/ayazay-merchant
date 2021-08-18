import {
  POST_SHOP,
  POST_SHOP_ERROR,
  GET_SHOPS,
  GET_SHOPS_ERROR,
  GET_SHOP_ID,
  GET_SHOP_ID_ERROR,
  UPDATE_SHOP,
  UPDATE_SHOP_ERROR,
  CLEAN_MESSAGE
}

  from '../types';

const INITIAL_STATE = {
  shopData: {
    name: '',
    gen_category_id: 4,
    website_url: '',
    facebook_url: '',
    description: '',
    address: '',
    contact_phno: '',
    email: '',
    custom_url: '',
    img_url: '',
    timeline_image: '',
    type: '',
  },
  errorMessage: '',
  status: '',
  submitSuccess: '',
  fail: false,
  loading: false,
  shopArray: [],
};

const shopProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHOP_ID:
      return {
        ...state,
        shopData: { ...state.shopData, ...action.payload },
        submitSuccess: 'Success',
        loading: false
      };

    case GET_SHOPS:
      return {
        ...state,
        shopArray: [...action.payload],
        loading: false,
      };
    case GET_SHOPS_ERROR:
      return {
        ...state,
        status: 'Error'
      }
    case GET_SHOP_ID_ERROR: {
      return {
        ...state,
        status: 'Error'
      }
    }

    case POST_SHOP:
      return {
        ...state,
        status: 'Success'
      };

    case POST_SHOP_ERROR:
      return {
        ...state,
        status: 'Error',
      };

    case UPDATE_SHOP:
      return {
        ...state,
        status: action.payload.status
      }
    case UPDATE_SHOP_ERROR:
      return {
        ...state,
        status: 'Error'
      }
    case CLEAN_MESSAGE:
      return {
        ...state,
        status: ''
      }

    default:
      return { ...state, message: false };
  }
};

export default shopProfileReducer;

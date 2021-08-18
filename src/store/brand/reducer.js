import {
  GET_BRAND_ERROR,GET_BRAND
} from '../types';

const INITIAL_STATE = {
  brands: [],
  error : null
};

const brandReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BRAND:
      return {
        ...state,
        brands: [...action.payload],
        error : null
      };
    case GET_BRAND_ERROR:
      return {
        ...state,
        error: {...action.payload},
      };
    default:
      return state;
  }
};

export default brandReducer;

import {
  GET_CATEGORY,GET_BRAND_ERROR
} from '../types';

const INITIAL_STATE = {
  categories: [],
  error : null
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: [...action.payload],
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

export default categoryReducer;

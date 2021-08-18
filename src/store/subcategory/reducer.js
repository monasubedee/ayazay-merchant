import {
  GET_SUB_CATEGORY,GET_SUB_CATEGORY_ERROR
} from '../types';

const INITIAL_STATE = {
  subcategories: [],
  error : null
};

const subcategoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUB_CATEGORY:
      return {
        subcategories: [...action.payload.subcategories],
        error : null
      };
    case GET_SUB_CATEGORY_ERROR:
      return {
        ...state,
        error: {...action.payload},
      };
    default:
      return state;
  }
};

export default subcategoryReducer;

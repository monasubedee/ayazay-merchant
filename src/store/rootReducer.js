import { combineReducers } from 'redux';
import merchantReducer from './merchant/reducer';
import shopProfileReducer from './shop/reducers';
import categoryReducer from './category/reducer';
import productReducer from './product/reducer';
import IssueReducer from './issue/reducer';
import subcategoryReducer from './subcategory/reducer';
import brandReducer from './brand/reducer';

const rootReducer = combineReducers({
  merchant: merchantReducer,
  shop: shopProfileReducer,
  category: categoryReducer,
  product: productReducer,
  issue: IssueReducer,
  brand : brandReducer,
  subcategory : subcategoryReducer
});

export default rootReducer;

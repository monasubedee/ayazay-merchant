import { createSelector } from 'reselect';

const productSelect = (state) => state.product;

export const productListSelect = createSelector(
  [productSelect],
  (product) => product.productList,
);
export const productloadingSelect = createSelector(
  [productSelect],
  (product) => product.loading,
);
export const productItemlengthSelect = createSelector(
  [productSelect],
  (product) => product.itemlength,
);

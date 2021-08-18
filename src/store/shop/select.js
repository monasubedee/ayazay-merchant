import { createSelector } from 'reselect';

const shopSelect = (state) => state.shop;

export const shopArraySelect = createSelector(
  [shopSelect],
  (shop) => shop.shopArray,
);

export const shopLoadingSelect = createSelector(
  [shopSelect],
  (shop) => shop.loading,
);
export const shopDataSelect = createSelector(
  [shopSelect],
  (shop) => shop.shopData,
);
export const shopErrorMessageSelect = createSelector(
  [shopSelect],
  (shop) => shop.errorMessage,
);
export const shopSubmitSuccessSelect = createSelector(
  [shopSelect],
  (shop) => shop.submitSuccess,
);

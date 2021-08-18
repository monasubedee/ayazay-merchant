import { createSelector } from 'reselect';

const categorySelect = (state) => state.category;

export const categoryitemSelect = createSelector(
  [categorySelect],
  (category) => category.category,
);

export const subCategorySelect = createSelector(
  [categorySelect],
  (category) => category.selectedSub,
);
export const brandSelect = createSelector(
  [categorySelect],
  (category) => category.brand,
);

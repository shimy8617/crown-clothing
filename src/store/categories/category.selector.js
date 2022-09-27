import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  console.log('selector fired 1');
  return state.categories;
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    console.log('selector fired 2');
    return categoriesSlice.categories
  }
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('selector fired 3')
  categories.reduce((acc, category) => {
  const { title, items } = category;
  acc[title.toLowerCase()] = items;
  return acc;
}, {})
}
);

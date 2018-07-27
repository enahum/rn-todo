import {createSelector} from 'reselect';

export function getAllCategories(state) {
    return state.categories;
}

export const getCategoryByName = createSelector(
    getAllCategories,
    (state, name) => name,
    (categories, name) => categories.find((t) => t.name === name),
);
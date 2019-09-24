export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorite = (id) => {
    return { type: TOGGLE_FAVORITE, mealId: id };
};

export const setFilters = filterSettings => { //pass in setting arg that has gluten, vegan etc options in form of object.
    return { type: SET_FILTERS, filters: filterSettings };
};
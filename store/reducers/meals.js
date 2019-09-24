import { MEALS } from '../../data/dummy-data'; 
//good idea is to go to all components that import MEALS and refactor to add store, so they get data and state from there instead.
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            //if already in favorites remove, if not add it.
            //if meal im looking at has same id as the meal for which this action happens, then it is there and needs to be removed.
            //if no match then not in favorites yet. 
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId)

            if (existingIndex >=0) { //so if existing index is 1 then meal is in there and needs to be removed.
                const updatedFavMeals = [...state.favoriteMeals]; //spread in existing fav meals to create copy so dont manipulate original.
                updatedFavMeals.splice(existingIndex, 1); //removes item.
                return { ...state, favoriteMeals: updatedFavMeals } //spread in state and only overwrite favoriteMeals with new favoriteMeals with item removed.
            } else { //if item not found, add it: 
                const meal = state.meals.find(meal => meal.id === action.mealId); //find the meal in state
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)} //then add that meal to the array.
            }
        case SET_FILTERS: 
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if (appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: updatedFilteredMeals }; //filteredMeals is state which is updated by this case.
        default:
            return state;
    }
};

export default mealsReducer;
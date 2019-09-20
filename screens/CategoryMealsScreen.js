import React from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealScreen = props => {
    const catId = props.navigation.getParam('categoryId');  //extracts params being passed from parent by its identifier, which gives us item.id, so can get cat title and all meals in cat.
    
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    const displayedMeals = MEALS.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0); //would be -1 if catId not part of categoryIds.
        //return meal.categoryIds.includes(catId);  //this also work and clearer? 

    return (
        <MealList 
            listData={displayedMeals} //listData props passed in and points to array we want to render.
            navigation={props.navigation} //have to forward navigation to child component b/c nav only available to a component directly loaded by a navigator.
        />
    );  
};

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title,
    }
};

export default CategoryMealScreen;

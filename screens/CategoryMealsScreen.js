import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; //leaner than using connect. 

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealScreen = props => {
    const catId = props.navigation.getParam('categoryId');  //extracts params being passed from parent by its identifier, which gives us item.id, so can get cat title and all meals in cat.
    //redux executes this function and automatically passes in current state as arg and then can return any data from that state: 
    const availableMeals = useSelector(state => state.meals.filteredMeals); //meals is identifier from combineReducer in App. retrieve filtered meals here from filters screen.

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0); //would be -1 if catId not part of categoryIds.
        //return meal.categoryIds.includes(catId);  //this also work and clearer? 

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found. Maybe check your filters?</DefaultText>
            </View>
        );
    };

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

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CategoryMealScreen;

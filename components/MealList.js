import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


import MealItem from '../components/MealItem';

const MealList = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id); //can use find also.

        return (
            <MealItem 
                title={itemData.item.title}
                image={itemData.item.imageUrl}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail', 
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite,
                        }
                    });
                }} //forward id so can render meal details on child screen.
            />
        );
    };

    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData} //gets this list prop from CategoryMealsScreen.
                renderItem={renderMealItem} 
                keyExtractor={(item, index) => item.id} //unnecessary in latest version.
                style={{width: '100%'}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MealList;
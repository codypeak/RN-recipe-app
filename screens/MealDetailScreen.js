import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

//import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    );
};

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals) //first meals is slice of state (identifier in rootReducer) and second is the property referenced in initialState.
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId)); //some returns true if at least one item in array is true.
    
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch(); //useDispatch is func to dispatch actions, store it in a const.

    const toggleFavoriteHandler = useCallback(() => { //add useCallback to avoid infinite loop
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);
    
    useEffect(() => { //can use this to forward title to header in navigationOptions, but it's slow b/c component has to render first and then run this after. 
        //cant use hook in something that isnt a hook or func comp, so use setParams to forward selected meal to navigationOptions header.
        //props.navigation.setParams({ mealTitle: selectedMeal.title });
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler]); //when selectedMeal changes forward info to header. 

    useEffect(() => { //if info changes set it in params and forward to header/navigationOptions
        props.navigation.setParams({ isFav: currentMealIsFavorite });
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text> 
            {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
    );
};

//best to forward header title from mealList rather than using useEffect.
MealDetailScreen.navigationOptions = (navigationData) => {
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle'); //this was identifier given in setParams above. 
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    //const selectedMeal = MEALS.find(meal => meal.id === mealId);

    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}> 
                <Item 
                    title="Favorite" 
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavorite} //point at toggleFavorite b/c holds a pointer to the handler func that will be executed onPress. 
                />
            </HeaderButtons>
        ) //this api component expect to take in HeaderButtonComponent that points to component to render.
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,

    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
});

export default MealDetailScreen;
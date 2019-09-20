import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
    //applies styles to all screens, so DRY. merges them into components, but specific component properties take precedence over defaults here. 
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator(
{  //first arg is your screens.
    Categories: {
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
}, 
{ //2nd arg is your configuration.
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
},{
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, //can point at a screen or component here (aka a stack).
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> : 'Meals'
        }},
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }},
};

const MealsFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    }) 
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        },
        activeTintColor: Colors.accentColor
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({ //still have to add menu icon separately to categories.
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator); //MealsNavigator nested in this so stack will still work. 

//top level components mapped with cSN get special props, ie navigation object with a lot of functions:
//actions, navigate, push, pop, replace, etc.

//navigate() takes in object with key routeName and value of where you want to navigate.
//properties have to match properties in cSN in form of a string.
//actually dont have to pass in routeName, can just pass in the route name string as the only arg.
//can navigate to screen you want. it also comes with back button automatically.
//navigating to a screen means its pushed on to the stack, back button pops it from the stack.

//push() works same as navigate but dont need object just name of screen.
//difference is you can push to a screen youre already on. it's pushed to the same stack. navigate to same screen does nothing.
//you want to use screen when a reusable component can have different type of contents, like a dropbox folder. then can push same/new screen with new content.

//goBack() same as back button, but might be good user experience to save everything before going back. works w/ all navigators.

//pop() same as goBack b/c it pops off last screen and shows the screen under it. difference is can only be used with stack nav.

//popToTop() pops of all screens and takes you back to root screen.

//replace() only takes in identifier and replaces the current screen you're on with the one you want to navigate to.
//however it does not stack the new screen on top of stack, it replaces, so do not get automatic back button b/c stack empty.
//so it's good for log in screen where once logged in should not be able to go back. 
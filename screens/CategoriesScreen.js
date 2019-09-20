import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return (
            <CategoryGridTile 
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({ 
                        routeName: 'CategoryMeals', 
                        params: {
                            categoryId: itemData.item.id, //forwarding id to new screen being loaded, so can use data in new screen.
                        }
                    });
                }}
            />
        );
    };

    return (
        <FlatList 
            keyExtractor={(item, index) => item.id}//func that gets item&index and returns the value for they key. new version of RN dont need this and recognize id automatically.
            data={CATEGORIES}
            renderItem={renderGridItem}
            numColumns={2} 
        />
    ); //FlatList itemData has item property and item has a title, which comes from our data model
};

//JS functions are just objects, so we can add a property to it.
CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: 
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => navData.navigation.toggleDrawer() }
                />
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CategoriesScreen;


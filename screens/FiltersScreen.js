import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''} //empty string is default.
                value={props.state} 
                onValueChange={props.onChange} //toggles state bool.
            /> 
        </View>
    );
};

const FiltersScreen = props => {
    const { navigation } = props; //destructure navigation so only updating when that changes, not every re-render b/c of all props.

    const [isGlutenFree, setIsGlutenFree] = useState(false); //switch requires state.
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    //useCallback ensures this function only runs on state change. caches is and only runs if dependencies change.
    const saveFilters = useCallback(() => { //need new function because save button in header doesnt have access to state. and can trigger from inside navigationOptions.
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian,
        };

        dispatch(setFilters(appliedFilters)); //dispatch an action from actions file passing in filter object to be forwarded.

    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);
    //will forward saveFilters function which captures current state to navigationOptions on state change.
    useEffect(() => {
        navigation.setParams({ save: saveFilters }); //setParams update params values for currently loaded screen.
    }, [saveFilters]); //updates only when dependencies change.

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch 
                label="Gluten-free"
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />
            <FilterSwitch 
                label="Lactose-free"
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch 
                label="Vegan"
                state={isVegan}
                onChange={newValue => setIsVegan(newValue)}
            />
            <FilterSwitch 
                label="Vegetarian"
                state={isVegetarian}
                onChange={newValue => setIsVegetarian(newValue)}
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Filters',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu" 
                    iconName="ios-menu" 
                    onPress={() => navData.navigation.toggleDrawer() }
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Save" 
                    iconName="ios-save" 
                    onPress={navData.navigation.getParam('save')} //retrieve save parameter from useEffect.
                />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    }
});

export default FiltersScreen;
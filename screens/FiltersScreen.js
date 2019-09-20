import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';

const FiltersScreen = props => {
    const [isGlutenFree, setIsGlutenFree] = useState(false); //switch requires state.

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <View style={styles.filterContainer}>
                <Text>Gluten</Text>
                <Switch 
                    trackColor={{ true: Colors.primaryColor }}
                    thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                    value={isGlutenFree} 
                    onValueChange={newValue => setIsGlutenFree(newValue)} //toggles state bool.
                /> 
            </View>
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Filters',
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
    }
});

export default FiltersScreen;
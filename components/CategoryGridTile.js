import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
        <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
            <View style={{...styles.container, ...{backgroundColor: props.color }}}>
                <Text style={styles.title} numberOfLines={2}>
                    {props.title}
                </Text> 
            </View>
        </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 
            ? 'hidden' //also hides shadow though. ripple is only for android so use platform.
            : 'visible',
        elevation: 3, //only works in android.
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',  //shadow properties only work in ios.
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end', //flex direction is column so moves to bottom of container.
        alignItems: 'flex-end', // cross axis so moves to right. 
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'right',
    }
});

export default CategoryGridTile;
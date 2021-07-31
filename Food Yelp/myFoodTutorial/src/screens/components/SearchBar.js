import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        
        <View style = {styles.backgroundStyle}>
            <Feather 
            name ='search' 
            style = {styles.IconStyle}
            />
            <TextInput                 
                autoCapitalize = 'none'
                autoCorrect = {false}
                style = {styles.inputStyle}
                placeholder = 'Search'  
                value = {term}
                onChangeText = {onTermChange} 
                onEndEditing = {onTermSubmit}        
            />
        </View>
    
    )
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginVertical: 10,
    },
    inputStyle: {
        flex: 1, //use as much space in the search bar
        fontSize: 18,
    },
    IconStyle: {
        fontSize: 35,
        alignSelf: 'center', //control layout of one single element
        marginHorizontal: 15,
    }
});

export default SearchBar;

// https://expo.github.io/vector-icons/
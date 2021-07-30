import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, useThemeUpdate } from './ThemeContext';


export default function FunctionContextComponent() {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    
    console.log('theme', darkTheme)
    const styles = StyleSheet.create({
        theme: {
            backgroundColor: darkTheme ? '#333' : '#CCC',
            // padding: 10,
            marginVertical: 10,
            height: 65,
            borderRadius: 10,
            justifyContent: 'center',
        },
        text: {
            color: darkTheme ? '#CCC' : '#333',
            alignSelf: 'center',
        }
    })

    return (
        <View>
            <TouchableOpacity 
                onPress={toggleTheme}
                style={someStyles.submit}>
                <Text>Toggle</Text>
            </TouchableOpacity>
            <View style={styles.theme}>
                <Text style={styles.text}>Function Theme</Text>
            </View>
        </View>
    )
}

const someStyles = StyleSheet.create({
    submit: {
        height: 50,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: 'white',
        backgroundColor: '#87ff5e',
        // backgroundColor: '#f7bf57',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
})




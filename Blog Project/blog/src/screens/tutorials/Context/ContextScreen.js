import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FunctionContextComponent from './FunctionContextComponent';
import ClassContextComponent from './ClassContextComponent';
import { ThemeProvider } from './ThemeContext';

export default function Context({ navigation }) {
    const pressHandler = () => navigation.navigate('Reduce')

    function Navigate() {
        return (
            <TouchableOpacity 
                onPress={pressHandler}
                style={{ ...styles.submit, backgroundColor: '#86abc2', marginTop: 0, }}>
                <Text style={{ color: 'white' }}>Navigate</Text>
            </TouchableOpacity>
        )
        
    }

    return (
    <ThemeProvider>
        <View style={styles.container}>
            <Navigate />
            <FunctionContextComponent />
            {/* <ClassContextComponent /> */}
        </View>
    </ThemeProvider>
    )
}





export const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
    },
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

// Provider: wrap around children which needs the context
// value: whatever the value of context is
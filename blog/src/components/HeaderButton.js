import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default HeaderButton = ({ onPressHandler, logo }) => {
        return (
            <TouchableOpacity 
                onPress={()=>onPressHandler()}
                style={styles.headerButton}
            >
                <Feather name={logo} size={35}/>
            </TouchableOpacity>
        )
    }

const styles = StyleSheet.create({
    headerButton: {
        margin: 10,
    }
});
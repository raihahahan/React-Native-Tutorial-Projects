// a reusable component to return list of results

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultsDetail from './ResultsDetail';
import { useNavigation } from '@react-navigation/native';

const ResultsList = ({ title, results }) => {
    const navigation = useNavigation();
    if (!results.length) return null;

    return (
        <View style = {styles.container}>
            <Text style = {styles.titleStyle}>{title}</Text>
            <FlatList 
                horizontal
                data = {results}
                keyExtractor = {(result) => result.id}
                renderItem = {({ item }) => {
                    return  (
                    <TouchableOpacity
                        onPress = {() => navigation.navigate('ResultsShow', { id: item.id})}
                    >
                        <ResultsDetail result = {item}/>
                        
                    </TouchableOpacity>
                        )
                }}
                showsHorizontalScrollIndicator = {false}

            
            />
        </View>
    )
};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5,
    },
    container: {
        marginBottom: 10,
    }
});

export default ResultsList;
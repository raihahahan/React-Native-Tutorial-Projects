import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from './api/yelp';

const ResultsShowScreen = ({ route }) => {
    const [result, setResult] = useState(null); //when we want to have an object as the results, initial value will be null
    const id = route.params.id
   
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };    

    useEffect(() => {
      getResult(id)  
    }, [])

    if (!result) return null;

    return (
        <View>
            <Text>{result.name}</Text>
            <FlatList 
                data={result.photos}
                keyExtractor={photo => photo}
                renderItem={({ item }) => {
                    return (
                        <Image 
                            source = {{ uri: item}}
                            style = {styles.image}
                        />
                    )
                }}
            
            />
        </View>
    )
};

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: 300,
    }
});

export default ResultsShowScreen;
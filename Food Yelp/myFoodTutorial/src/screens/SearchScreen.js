import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import SearchBar from '../screens/components/SearchBar';
import useResults from './hooks/useResults';
import ResultsList from './components/ResultsList';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


const SearchScreen = ()=> {
    const [refreshing, setRefreshing] = useState(false);
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false), []);
    })
    
    const filterResultsByPrice = (price) => {
        // price === "$" || "$$" || "$$$"
        return results.filter(result => {
            return result.price === price
        })
    }
 
    return (   
        <>
            <SearchBar
                term = {term}
                onTermChange = {setTerm}
                onTermSubmit = {() => searchApi(term)} //when we call searchApi, we pass in term argument. so we can easily pass in value to searchApi when our component is first rendered on the screen.
            />   
            {errorMessage ? <Text>{errorMessage}</Text> : null}   
            
            <ScrollView
                refreshControl = {
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >

            <ResultsList 
                title = "Cost Effective"
                results = {filterResultsByPrice('$')}
            /> 
            <ResultsList 
                title = "Bit Pricier"
                results = {filterResultsByPrice('$$')}
            /> 
            <ResultsList 
                title = "Big Spender"
                results = {filterResultsByPrice('$$$')}
            /> 
            <ResultsList 
                title = "Special Occasion"
                results = {filterResultsByPrice('$$$$')}
            /> 
            </ScrollView>
        </>    // allows us to return a bunch of elements without rendering an element on the screen. hence, no wrapping element rendering all other elements
    )
};

const styles = StyleSheet.create({

});

export default SearchScreen;

/*
Two things we can use to make a network request:
    1. fetch: built-in function 
        - error handling is a bit weird
        - requires us to write a lot of wrapper code to make it work 'sensibly'

    2. axios: separate library for making requests
        - easy to use, sensible defaults
        - increases our app size (very, very slightly)
*/

//useEffet a hook that allows us to run some code just one time when our component is first rendered to the screen
/*
- useEffect(() => {}) : runs the arrow func every time the component is rendered
- useEffect(() => {}, []) : runs the arrow func only when the component is first rendered
- useEffect(() => {}, [value]) : runs the arrow func only when the component is first rendered, and when the 'value' changes
*/
import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context } from '../context/BlogContext';
import HeaderButton from '../components/HeaderButton';

const ShowScreen = ({ route, params, navigation }) => {
    const { state } = useContext(Context); // in createDataContext, our value is an object { state, ...boundActions }. Hence, we are able to destructure off just the state value.
    // our state contains a big list of all the different blog posts that we currently have
    // const blogPost = state.find((blogPost)=>blogPost.id === id)
    const { id } = route.params;
    const blogPost = state.find(
        blogPost => blogPost.id === id
    )
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: `${blogPost.title} - ${blogPost.id}`,
            headerRight: ()=>{
                return <HeaderButton
                    onPressHandler={()=>navigation.navigate('Edit', { id })}
                    logo='edit'
                />
            } 
        })
    })

    return (
    <View>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.content}</Text>
    </View>
    )
}


const styles = StyleSheet.create({});

export default ShowScreen;

// our context is imported from blogcontext file
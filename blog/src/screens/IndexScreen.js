import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import HeaderButton from '../components/HeaderButton';

const IndexScreen = ({ navigation }) => {
    const { state: blogposts, deleteBlogPost } = useContext(BlogContext); //gives us info from value prop in provider component. addBlogPost is an item of the boundActions object

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>{
                return <HeaderButton
                    onPressHandler={()=>navigation.navigate('Create')}
                    logo='plus'
                />
            } 
        })
    })

    return (
        <View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data = {blogposts}
                keyExtractor = {(blogPost) => blogPost.title}
                renderItem={({ item })=> {
                    return (
                        <TouchableOpacity
                            onPress={()=>navigation.navigate('Show', {
                                id: item.id
                            })}
                        >
                            <View style={styles.row}>
                            <Text style={styles.title}>{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}><Feather style={styles.icon} name="trash"/></TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    title: {
        fontSize: 18,
    },
    icon: {
        fontSize: 24,
    },
    addBlog: {
        alignItems: "center",
        backgroundColor: "#C5CAE9",
        padding: 10,
        height: 60,
    },
    addPost: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerButton: {
        margin: 10,
    }
});

export default IndexScreen;


//we use context to manage our data
//we use useState hook or Class components to manage state


// JSON server
/*
json-server package: server that serves json data for development purposes.

*/
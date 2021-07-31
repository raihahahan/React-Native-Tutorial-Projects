import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const BlogPostForm = ({ onSubmit, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Enter Title:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text)=>setTitle(text)}
            />
        <Text style={styles.label}>Enter Content:</Text>
            <TextInput
                style={styles.input}
                value={content}
                onChangeText={(text)=>setContent(text)}
            />
        <TouchableOpacity
            onPress = {() => {
               onSubmit(title, content) 
            }}
            style={styles.addBlog}
        >
            <Text style={styles.addPost}>Save</Text>             
        </TouchableOpacity>
    </View>
    )
};

BlogPostForm.defaultProps = { // give our components some default property values if the given prop is not being passed in
    initialValues: {
        title: '',
        content: ''
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
        marginTop: 10,
    },
    input: {
        fontSize: 18,
        borderWidth: 0.2,
        borderColor: 'black',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        marginBottom: 15,
    },
    addBlog: {
        alignItems: "center",
        backgroundColor: "#C5CAE9",
        padding: 10,
        height: 60,
        borderRadius: 20,
        marginTop: 20,
    },
    addPost: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default BlogPostForm;
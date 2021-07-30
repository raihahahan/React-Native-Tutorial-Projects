import React, { useLayoutEffect, useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ route, params, navigation }) => {
    const { state, editBlogPost } = useContext(Context);
    const { id } = route.params;

    const blogPost = state.find(
        blogPost => blogPost.id === id
    )
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title: `Edit blogpost #${blogPost.id}`
            } 
        )
    })

    return <BlogPostForm
        onSubmit={(title, content)=>{
            editBlogPost(id, title, content, ()=>navigation.pop());
        }}
        initialValues={{ title: blogPost.title, content: blogPost.content }}
    />
}

export default EditScreen;
import createDataContext from './createDataContext';

// const BlogContext = createContext();

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [...state, 
                { 
                    title: action.payload.title, 
                    id: Math.floor(Math.random() * 99999),
                    content: action.payload.content,
                }];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id 
                ? action.payload 
                : 
                blogPost;
            })
        default: 
            return state;
    }
};

const addBlogPost = dispatch => { // function that describes how we want to change our data
    return (title, content, callback) => {
        dispatch({ type: 'add_blogpost', payload: { title, content } })
        if (callback) callback(); // dispatch must always pass in an argument that is an object with properties type and payload
    } // inner function here is what we end up calling from inside our component
};

const deleteBlogPost = dispatch => {
    return (id) => { // this inner function is what we're running inside the component
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, callback) => {
        dispatch({ 
            type: 'edit_blogpost', 
            payload: { id, title, content }})
        if (callback) callback();
    }
}


export const { Context, Provider } = createDataContext( // exporting two variables called Context and Provider
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost },
    [{
        title: 'Hello World', 
        id: Math.floor(Math.random() * 99999),
        content: 'Hello, world',}]
    );

    

//createDataContext(reducer, actions, initialState)

// when blogReducer runs, it returns a state, which rerenders the BlogProvider. we will get our new state variable returned from our reducer. hence, when index screen is rerendered, it will take in the new value of blogPosts, set it as data for flatlist.

// export const BlogProvider = ({ children }) => {
//     const [blogPosts, dispatch] = useReducer(blogReducer, []); // const [state, dispatch]. 

//     /*
//         blogPosts: state,
//         dispatch: similar to action in our reducer,
//         blogReducer: reducer function,
//         []: initial state of blogPosts,

//         const [state, dispatch] = useReducer(reducer, initialState)

//         -----------------------------------------------------------
//         blogReducer(state, action)

//         state: currentState
//         action: object with properties type and payload ==> what kind of action we dispatch. in this case, it is { type: 'add_blogpost' }
//             type: identifies what type of action we want to do
//             payload: identifies value of action // any

//     */

    



//     return <BlogContext.Provider 
//             value = {{
//                 data: blogPosts, //array of blogPosts
//                 addBlogPost
//             }}
//         >
//         {children}
//     </BlogContext.Provider>;
// };

// export default BlogContext;


/*
    children: unrelated to context

    const App = () => {
        return <CustomComponent>
            <Text>Hi there</Text>
        </CustomComponent>
    }

    - we pass down children as a prop from App to CustomComponent. 
    - we can accept other components as an argument.

    children: <Text>Hi there</Text>

    in this project, children = <App />
    <BlogContext.Provider> is wrappping the entire stack navigator (<App/>) component inside it
    
    - when we create a context object, we also get inside the object something caled the Provider, whcih accepts some info, and this info will be available to all our child components

    pass a single object {data: blogPosts (array of blogposts), addBlogPost: ()=>{//callback function from blog post provider down to index screen.}}
*/

/*
1. app first renders: initial state of blogPosts: empty array hence, no blogposts
2. set up provider, render entire application, given value from blogContext.Provider. these info are blogposts and addBlogPost that will dispatch an action of type 'addblogpost'
3. that will call dispatch (function used to modify our state) and call it with an object as argument with type: 'add_blog_post'
4. runs blogReducer(state, action) function. state: current state, action: type and payload properties. this reducer function returns a state
5. the returning of state causes the blogcontext Provider to rerender (just like useState hook)
6. after rerender, we will get the new blogPosts array
7. rest of application rerenders, indexScreen takes the new value of blogPosts and set it as data for flatlist.

*/

/*
Everytime we want to add in an additional way to change our state object, we do 2 things:
1. add a new function to call dispatch func to make a change to our state object
2. add additional case to our reducer

*/
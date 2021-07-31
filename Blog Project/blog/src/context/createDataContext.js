import React, { useReducer } from 'react';

export default (reducer, actions, initialState) => {
// pass the 3 things we need to customise anytime we want to create a context
/*
    1. reducer function
    2. helper functions that contains a dispatch inside of it
    3. initial state that we call useReducer with

    actions object: 
        contains action functions which describes how we change our state objects called dispatch

    actions === { addBlogPost: (dispatch) => { return () => {} } }
        1. loop through actions object
        2. for every key, we take the function (value of key), call it with dispatch as argument, and returns f () => {}.
        3. and f is the function that we will pass on down into our value prop in Context.Provider, and we let all our child components to make changes to the state object
*/
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        
        const boundActions = {}; // indicates that we process all these actions, and they are bound to the copy of dispatch

        for (let key in actions) {
            // actions is an object containing all the dispatch actions. but these actions do not have access to useReducer dispatch.
            // this function loops over actions object, and set the key as the function name, and value as the action to be dispatched with useReducer dispatch as the argument. so now, in the individual context file, we can pass in dispatch as an argument for the function
            // key === addBlogPost
            boundActions[key] = actions[key](dispatch)
            // boundActions === { addBlogPost: (dispatch) => { return () => {} }}
        }

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    }

    return { Context, Provider };
}

/*
    actions: object that has all these different callback functions we want to make available to our child component

    automate process of setting up context stuff

    to make a new resource:
        1. create a new context file
        2. create reducer inside
        3. create the different functions to dispatch an action to modify our reducer
        4. export const { Context, Provider } = createDataContext(
            reducer,
            {...actions},
            initialState
        ) // call the createDataContext() function



*/
import React, { useReducer, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';

const ACTIONS = {
    ADD_TODO: 'add',
    CLEAR_TODO: 'clear',
    TOGGLE_TODO: 'toggle',
    DELETE_TODO: 'delete',
}


export default function Reduce({ navigation }) {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('');

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.ADD_TODO:
                return [...state, newTodo(action.payload.name)]
            case ACTIONS.CLEAR_TODO:
                return clearTodo(state)
            case ACTIONS.TOGGLE_TODO:
                return state.map(todo => {
                    if (todo.id === action.payload.id) {
                        return { ...todo, complete: !todo.complete }
                    }
                        return todo;
                })
            case ACTIONS.DELETE_TODO:
                return state.filter(todo => todo.id !== action.payload.id)
            default:
                return state;
        }
    }

    function newTodo(name) {
        return { id: Date.now(), name: name, complete: false, }
    }

    function clearTodo(state) {
        return state.reduce((initial)=>{return initial}, [])
    }

    function handleSubmit() {
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name }})
        setName('')
    }

    function handleReset() {
        dispatch({ type: ACTIONS.CLEAR_TODO })
    }

    function handleToggle(id) {
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id }})
    }

    function handleDelete(id) {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: { id }})
    }
    
    console.log("todos", todos)
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="placeholder"
                style={styles.input}
                onChangeText={name => setName(name)}
                value={name}
            />
            <TouchableOpacity 
                onPress={handleSubmit}
                style={styles.submit}>
                <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleReset}
                style={{ ...styles.submit, backgroundColor: 'red', marginTop: 0, }}>
                <Text style={{ color: 'white' }}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('Context')}
                style={{ ...styles.submit, backgroundColor: '#86abc2', marginTop: 0, }}>
                <Text style={{ color: 'white' }}>Navigate</Text>
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={todos}
                keyExtractor={item=>JSON.stringify(item.id)}
                renderItem={({ item: todo })=>{
                    return (
                        <View style={
                            {...styles.flatlist, 
                            backgroundColor: todo.complete ? '#AAA' : '#FFF'}
                            }> 
                            <Text>
                                {todo.name}
                            </Text>
                            <View style={styles.togDelContainer}>
                                <TouchableOpacity onPress={()=>handleToggle(todo.id)}>
                                    <View style={styles.toggle}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleDelete(todo.id)}>
                                    <View style={styles.delete}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
       
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        margin: 12,
    },
    input: {
        height: 50,
        borderWidth: 0.3,
        padding: 10,
        borderRadius: 20,
      },
    submit: {
        height: 50,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: 'white',
        backgroundColor: '#87ff5e',
        // backgroundColor: '#f7bf57',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    flatlist: {
        borderTopWidth: 0.4,
        borderTopColor: 'black',
        borderBottomWidth: 0.4,
        borderBottomColor: 'black',
        height: 65,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    },
    togDelContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
       
    },
    toggle: {
        borderWidth: 1,
        height: 20,
        width: 20,
        marginRight: 30,
        marginBottom: 20,
    },
    delete: {
        borderWidth: 1,
        height: 20,
        width: 20,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: 'red',
        borderRadius: 100,
    }

})



    // reducer(): function we perform on our state
    // initialState: self-explanatory, usually an object
    // state
    // dispatch: function to update our state --> calls our reducer given some params
    // action: what we pass into dispatch. whenever we call dispatch, whatever we call dispatch with, its going to be set into the action variable and then our current state is going to be in the state variable, and our reducer will return our new updated state.

/*
    const initialState = { count: 0 };

    const reducer = (state, action) => {
        switch (action.type) {
            case ACTIONS.INCREMENT:
                return { count: state.count + 1 };
            case ACTIONS.DECREMENT:
                return { count: state.count - 1 };
            default:
                return state;
        }
        
    }

    const [state, dispatch] = useReducer(reducer, initialState) 

    function increment() {
        dispatch({ type: 'increment' });
    }

    function decrement() {
        dispatch({ type: 'decrement' });
    }

    return (
        <View>
            <Button title="+" onPress={increment}/>
            <Text>{state.count}</Text>
            <Button title="-" onPress={decrement}/>
        </View>
    )

*/
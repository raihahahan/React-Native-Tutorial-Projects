import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {Component} from 'react';
import SearchScreen from './src/screens/SearchScreen'
import HomeScreen from './src/screens/HomeScreen'
import ResultsShowScreen from './src/screens/ResultShowScreen'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer theme = {MyTheme}>
      <Stack.Navigator
      initialRouteName = "Search"
      >
        <Stack.Screen 
          name = "Home"
          component = { HomeScreen }   
          options = {{
            title: "Home"
          }}   
        />

        <Stack.Screen 
          name = "Search"
          component = { SearchScreen }
          options = {{ 
            title: "Business Search"
          }}
        />

        <Stack.Screen 
          name = "ResultsShow"
          component = { ResultsShowScreen }
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
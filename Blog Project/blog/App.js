import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import IndexScreen from './src/screens/IndexScreen';
import React from 'react';
import { Provider as BlogProvider } from './src/context/BlogContext';
import Reduce from './src/screens/tutorials/ReducerScreen';
import Context, { styles } from './src/screens/tutorials/Context/ContextScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import { TouchableOpacity } from 'react-native';
import EditScreen from './src/screens/EditScreen';


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme = {MyTheme}>
      <Stack.Navigator
      initialRouteName = "Index"
      >
        <Stack.Screen 
          name = "Index"
          component = { IndexScreen }
          options = {{
            headerTitle: "Blogs",
            }
          }
        />
        <Stack.Screen 
          name = "Reduce"
          component = { Reduce }
          options = {{
            title: "Reduce"
          }}
        />
        <Stack.Screen 
          name = "Context"
          component = { Context }
          options = {{
            title: "Context"
          }}
        />
        <Stack.Screen 
          name = "Show"
          component = { ShowScreen }
          options = {{
            title: "Blog Post",
              }
            }
        />
        <Stack.Screen 
          name = "Create"
          component = { CreateScreen }
          options = {{
            title: "Create Post"
          }}
        />
        <Stack.Screen 
          name = "Edit"
          component = { EditScreen }
          options = {{
            title: "Edit Post"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return <BlogProvider>
          <App />
         </BlogProvider>
}

/*
  Context:
    1. moves info from a parent to some nested child
    2. complicated to setup, lots of special terms
    3. easy to communicate data from a parent to a super nested child
*/
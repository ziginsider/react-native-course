import React from 'react';
import {EditTodoForm} from './src/features/edit_todo/EditTodo';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/navigation/RootStackParams';
import {Main} from './src/screens/Main';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{title: 'TODO'}}
          />
          <Stack.Screen name="Edit" component={EditTodoForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

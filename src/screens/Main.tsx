import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MainBottomTabParamList} from '../navigation/MainBottomTabParamList';
import {Todos} from '../features/todos/Todos';
import {Markers} from '../features/location_markers/Markers';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

export const Main = () => {
  const uncompletedTodos = () => <Todos isShowCompleted={false} />;
  const completedTodos = () => <Todos isShowCompleted={true} />;
  const markers = () => <Markers />;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name === 'Completed') {
            iconName = 'recycle';
          } else if (route.name === 'Uncompleted') {
            iconName = 'check';
          } else if (route.name === 'Markers') {
            iconName = 'map-marker';
          }
          size = focused ? 25 : 20;
          color = '#348FEB';
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: {fontSize: 14},
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: '#eee',
      }}>
      <Tab.Screen name="Uncompleted" component={uncompletedTodos} />
      <Tab.Screen name="Completed" component={completedTodos} />
      <Tab.Screen name="Markers" component={markers} />
    </Tab.Navigator>
  );
};

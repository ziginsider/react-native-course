import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../navigation/MainBottomTabParamList';
import {
  catsTab,
  completedTodosTab,
  markersTab,
  setTabIcons,
  squareTab,
  tabBarOptions,
  uncompletedTodosTab,
} from './screens_jsx_elements/MainTabNavigatorElements';

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => setTabIcons({route})}
      tabBarOptions={tabBarOptions()}>
      <Tab.Screen name="Uncompleted" component={uncompletedTodosTab} />
      <Tab.Screen name="Completed" component={completedTodosTab} />
      <Tab.Screen name="Markers" component={markersTab} />
      <Tab.Screen name="Square" component={squareTab} />
      <Tab.Screen name="Cats" component={catsTab} />
    </Tab.Navigator>
  );
};

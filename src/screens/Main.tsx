import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../navigation/MainBottomTabParamList';
import {
  completedTodosTab,
  markersTab,
  setTabIcons,
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
    </Tab.Navigator>
  );
};

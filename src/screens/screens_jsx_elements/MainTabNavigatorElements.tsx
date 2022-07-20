import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MainBottomTabParamList} from '../../navigation/MainBottomTabParamList';
import {Todos} from '../../features/todos/Todos';
import {Markers} from '../../features/location_markers/Markers';
import {RouteProp} from '@react-navigation/native';
import {Square} from '../../features/animation/Square';
import {Catlist} from '../../features/catlist/Catlist';

export const uncompletedTodosTab = () => <Todos isShowCompleted={false} />;

export const completedTodosTab = () => <Todos isShowCompleted={true} />;

export const markersTab = () => <Markers />;

export const squareTab = () => <Square />;

export const catsTab = () => <Catlist />;

const navigationTabIcons = {
  Completed: 'recycle',
  Uncompleted: 'check',
  Markers: 'map-marker',
  Square: 'square',
  Cat: 'cat',
};

const getIconName = (routeName: keyof MainBottomTabParamList): string => {
  if (routeName === 'Completed') {
    return navigationTabIcons.Completed;
  } else if (routeName === 'Uncompleted') {
    return navigationTabIcons.Uncompleted;
  } else if (routeName === 'Markers') {
    return navigationTabIcons.Markers;
  } else if (routeName === 'Square') {
    return navigationTabIcons.Square;
  } else if (routeName === 'Cats') {
    return navigationTabIcons.Cat;
  } else {
    return navigationTabIcons.Completed;
  }
};

export const setTabIcons = ({
  route,
}: {
  route: RouteProp<MainBottomTabParamList, keyof MainBottomTabParamList>;
}) => {
  return {
    tabBarIcon: (focused: boolean, color: string, size: number) => {
      size = focused ? 25 : 20;
      color = '#348FEB';
      return (
        <FontAwesome5
          name={getIconName(route.name)}
          size={size}
          color={color}
        />
      );
    },
  };
};

export const tabBarOptions = () => {
  return {
    labelStyle: {fontSize: 14},
    activeBackgroundColor: 'white',
    inactiveBackgroundColor: '#eee',
  };
};

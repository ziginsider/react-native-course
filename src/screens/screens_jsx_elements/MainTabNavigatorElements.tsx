import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {MainBottomTabParamList} from '../../navigation/MainBottomTabParamList';
import {Todos} from '../../features/todos/Todos';
import {Markers} from '../../features/location_markers/Markers';
import {RouteProp} from '@react-navigation/native';

export const uncompletedTodosTab = () => <Todos isShowCompleted={false} />;

export const completedTodosTab = () => <Todos isShowCompleted={true} />;

export const markersTab = () => <Markers />;

const navigationTabIcons = {
  Completed: 'recycle',
  Uncompleted: 'check',
  Markers: 'map-marker',
};

const getIconName = (routeName: keyof MainBottomTabParamList): string => {
  if (routeName === 'Completed') {
    return navigationTabIcons.Completed;
  } else if (routeName === 'Uncompleted') {
    return navigationTabIcons.Uncompleted;
  } else if (routeName === 'Markers') {
    return navigationTabIcons.Markers;
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

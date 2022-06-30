import React from 'react';
import {View} from 'react-native';
import {Marker} from 'react-native-maps';
import {Coordinates} from '../../models/todo';

export const markers = (coordinates: (Coordinates | undefined)[]) => {
  return (
    <View>
      {coordinates.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{latitude: marker?.lat ?? 0, longitude: marker?.lng ?? 0}}
          title="todo marker"
          description="todo marker description"
        />
      ))}
    </View>
  );
};

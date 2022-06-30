import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';
import {markers} from '../../screens/screens_jsx_elements/MarkersElemets';
import {selectTodosCoordinates} from '../todos/todosSlice';
import {styles} from './markers.styles';

export const Markers = () => {
  const markersCoordinate = useSelector(selectTodosCoordinates);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markersCoordinate[0]?.lat ?? 53.9069915,
          longitude: markersCoordinate[0]?.lng ?? 27.4840562,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers(markersCoordinate)}
      </MapView>
    </View>
  );
};

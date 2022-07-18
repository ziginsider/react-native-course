import GetLocation from 'react-native-get-location';
import {Coordinates} from '../../models/todo';

export const requestCurrentLocation = (
  setCurrentLocation: (
    value: React.SetStateAction<Coordinates | undefined>,
  ) => void,
) => {
  console.log('location permission was granted');
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location) => {
      console.log(location);
      setCurrentLocation(getCoordinates());

      function getCoordinates(): Coordinates {
        return {
          lat: location.latitude,
          lng: location.longitude,
        };
      }
    })
    .catch((error) => {
      const {code, message} = error;
      console.warn(code, message);
    });
};

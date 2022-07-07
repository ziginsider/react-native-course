import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Coordinates, Todo} from '../../models/todo';
import {
  editScreenProp,
  editScreenRouteType,
} from '../../navigation/RootStackParams';
import {updateLocation, updateScreen} from './edit.todo.utils';

export interface UpdateScreen {
  navigation: editScreenProp;
  isUpdate: boolean;
  todo?: Todo;
  currentLocation?: Coordinates;
}

export function useUpdateScreen(
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
) {
  const navigation = useNavigation<editScreenProp>();

  const {
    params: {isUpdate, todo},
  } = useRoute<editScreenRouteType>();

  const [isLocationPermissionAllowed, setLocationPermissionStatus] =
    useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>();

  /* eslint-disable */
  useFocusEffect(
    useCallback(() => {
      updateScreen(
        isUpdate,
        navigation,
        todo,
        setInputValue,
        setLocationPermissionStatus,
        checkPermissionAndGetCurrentLocation,
      );
    }, [navigation, isUpdate, todo, isLocationPermissionAllowed]),
  );
  /* eslint-enable */

  const checkPermissionAndGetCurrentLocation = updateLocation(
    isLocationPermissionAllowed,
    setCurrentLocation,
  );

  const udateScreenData: UpdateScreen = {
    navigation: navigation,
    isUpdate: isUpdate,
    todo: todo,
    currentLocation: currentLocation,
  };

  return udateScreenData;
}

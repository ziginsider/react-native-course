import {AnyAction} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import {editScreenProp} from '../../navigation/RootStackParams';
import {requestCurrentLocation} from '../../services/location/location';
import {requestLocationPermissionStatus} from '../../services/permissions/permissions.requests';
import {throwExpression} from '../../utils/utils';
import {todoAdded, todoEdited} from '../todos/todosSlice';
import {
  Coordinates,
  Todo,
  TodoData,
} from '/Users/Aliaksei_Kisel/Desktop/work/rn_course/project/module2/react_native_course/src/models/todo';

export function getLocationText(currentLocation: Coordinates | undefined) {
  return () => {
    return `Current location: latitude = ${
      currentLocation?.lat ?? '...'
    }, longitude = ${currentLocation?.lng ?? '...'}`;
  };
}

export function updateLocation(
  isLocationPermissionAllowed: boolean,
  setCurrentLocation: React.Dispatch<
    React.SetStateAction<Coordinates | undefined>
  >,
) {
  return () => {
    if (isLocationPermissionAllowed) {
      requestCurrentLocation(setCurrentLocation);
    } else {
      console.log("Location permission wasn't granted");
    }
  };
}

export function updateScreen(
  isUpdate: boolean,
  navigation: editScreenProp,
  todo: Todo | undefined,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setLocationPermissionStatus: React.Dispatch<React.SetStateAction<boolean>>,
  checkPermissionAndGetCurrentLocation: () => void,
) {
  const name = isUpdate ? 'EDIT TODO' : 'ADD TODO';
  navigation.setOptions({title: name});
  if (isUpdate) {
    const updateDescription = todo?.description ?? '';
    setInputValue(updateDescription);
  }
  requestLocationPermissionStatus(setLocationPermissionStatus).then(
    checkPermissionAndGetCurrentLocation,
  );
}

function getTodoData(
  newDescription: string,
  newCoordinates?: Coordinates,
  newPhotoUrl?: string,
): TodoData {
  return {
    description: newDescription,
    coordinates: newCoordinates,
    photoUrl: newPhotoUrl,
  } as TodoData;
}

function getEditedTodo(
  newDescription: string,
  newCoordinates?: Coordinates,
  newPhotoUrl?: string,
  todoId?: string,
  isCompleted?: boolean,
): Todo {
  return {
    id: todoId ?? throwExpression('The todo ID is undefined'),
    isCompleted:
      isCompleted ??
      throwExpression("The 'isCompleted' parameter of todo is undefined"),
    description: newDescription,
    coordinates: newCoordinates,
    photoUrl: newPhotoUrl,
  } as Todo;
}

export function dispatchTodo(
  dispatch: Dispatch<AnyAction>,
  isUpdate: boolean,
  description: string,
  todo?: Todo,
  newCoordinates?: Coordinates,
  newPhotoUrl?: string,
) {
  if (isUpdate && description.trim().length > 0) {
    dispatch(
      todoEdited(
        getEditedTodo(
          description,
          newCoordinates,
          newPhotoUrl,
          todo?.id,
          todo?.isCompleted,
        ),
      ),
    );
  } else if (description.trim().length > 0) {
    dispatch(todoAdded(getTodoData(description, newCoordinates, newPhotoUrl)));
  }
}

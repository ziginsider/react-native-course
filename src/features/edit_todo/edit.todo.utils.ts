import {AnyAction} from '@reduxjs/toolkit';
import {Dispatch} from 'react';
import {Keyboard} from 'react-native';
import {editScreenProp} from '../../navigation/RootStackParams';
import {requestCurrentLocation} from '../../services/location/location';
import {requestLocationPermissionStatus} from '../../services/permissions/permissions.requests';
import {throwExpression} from '../../utils/utils';
import {todoAdded, todoEdited} from '../todos/todosSlice';
import {Coordinates, Todo, TodoData} from '../../models/todo';
import {UpdateScreen} from './edit.todo.hooks';

interface DispatchTodo {
  isUpdate: boolean;
  description: string;
  todo?: Todo;
  newCoordinates?: Coordinates;
  newPhotoUrlId?: string;
}

export function updateTodo(
  updateData: UpdateScreen,
  inputValue: string,
  dispatch: Dispatch<AnyAction>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
) {
  return () => {
    const dispatchData: DispatchTodo = {
      isUpdate: updateData.isUpdate,
      description: inputValue,
      todo: updateData.todo,
      newCoordinates: updateData.currentLocation,
      newPhotoUrlId: updateData.todo?.id,
    };
    dispatchTodo(dispatch, dispatchData);
    clearInput(setInputValue);
    updateData.navigation.goBack();
  };
}

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
  };
}

function dispatchTodo(rootDispatch: Dispatch<AnyAction>, data: DispatchTodo) {
  if (data.isUpdate && data.description.trim().length > 0) {
    rootDispatch(
      todoEdited(
        getEditedTodo(
          data.description,
          data.newCoordinates,
          data.newPhotoUrlId,
          data.todo?.id,
          data.todo?.isCompleted,
        ),
      ),
    );
  } else if (data.description.trim().length > 0) {
    const todoData: TodoData = {
      description: data.description,
      coordinates: data.newCoordinates,
      photoUrl: data.newPhotoUrlId,
    };
    rootDispatch(todoAdded(todoData));
  }
}

export function clearInput(
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
) {
  return () => {
    Keyboard.dismiss();
    setInputValue('');
  };
}

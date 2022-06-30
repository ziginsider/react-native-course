import React, {useCallback, useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
  Keyboard,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../app/hooks';
import {selectTodoById} from '../todos/todosSlice';
import {styles} from './edit.todo.styles';
import {
  editScreenProp,
  editScreenRouteType,
} from '../../navigation/RootStackParams';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {Coordinates} from '../../models/todo';
import {
  dispatchTodo,
  getLocationText,
  updateLocation,
  updateScreen,
} from './edit.todo.utils';
import {ScrollView} from 'react-native-gesture-handler';
import {getPhotoUri} from '../../services/photo/photo';

export const EditTodoForm = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const navigation = useNavigation<editScreenProp>();

  const {
    params: {isUpdate, todoId},
  } = useRoute<editScreenRouteType>();

  const todo = useSelector((state: RootState) =>
    selectTodoById(state, todoId as string),
  );

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

  const clearInput = () => {
    Keyboard.dismiss();
    setInputValue('');
  };

  const locationTxt = getLocationText(currentLocation);

  const onSaveTodo = () => {
    dispatchTodo(dispatch, isUpdate, inputValue, todo, currentLocation);
    clearInput();
    navigation.goBack();
  };

  const goToCamera = () => {
    console.log('id=', todoId);
    navigation.navigate('Camera', {todoId: todoId ?? inputValue});
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
            placeholder="Enter todo..."
            style={styles.textInput}
            onChangeText={(text) => setInputValue(text)}
            value={inputValue}
            onSubmitEditing={onSaveTodo}
          />
          <TouchableOpacity
            onPress={clearInput}
            style={styles.clearIconContainer}>
            <Text style={styles.texticonClose}> &#10005;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="open camera"
            onPress={goToCamera}
            disabled={!inputValue || !currentLocation || !todoId}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={isUpdate ? 'Update todo' : 'Add todo'}
            onPress={onSaveTodo}
            disabled={!inputValue || !currentLocation}
          />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{locationTxt()}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imagePhoto}
            source={{
              uri: getPhotoUri(todoId),
            }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

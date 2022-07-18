import React, {useState} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './edit.todo.styles';
import {clearInput, getLocationText, updateTodo} from './edit.todo.utils';
import {ScrollView} from 'react-native-gesture-handler';
import {getPhotoUri} from '../../services/photo/photo';
import {useAppDispatch} from '../../app/hooks';
import {UpdateScreen as UpdateScreen, useUpdateScreen} from './edit.todo.hooks';

export const EditTodoForm = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useAppDispatch();

  const updateData: UpdateScreen = useUpdateScreen(setInputValue);

  const locationTxt = getLocationText(updateData.currentLocation);

  const onSaveTodo = updateTodo(
    updateData,
    inputValue,
    dispatch,
    setInputValue,
  );

  const goToCamera = () => {
    updateData.navigation.navigate('Camera', {todoId: updateData?.todo?.id});
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
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
            onPress={clearInput(setInputValue)}
            style={styles.clearIconContainer}>
            <Text style={styles.texticonClose}> &#10005;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="open camera"
            onPress={goToCamera}
            disabled={
              !inputValue ||
              !updateData.currentLocation ||
              !updateData?.todo?.id
            }
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title={updateData.isUpdate ? 'Update todo' : 'Add todo'}
            onPress={onSaveTodo}
            disabled={!inputValue || !updateData.currentLocation}
          />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{locationTxt()}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imagePhoto}
            source={{
              uri: getPhotoUri(updateData?.todo?.id),
            }}
            resizeMode="cover"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

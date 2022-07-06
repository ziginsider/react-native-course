import React, {useCallback} from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Button,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppDispatch} from '../../app/hooks';
import {selectTodoById, todoAdded, todoEdited} from '../todos/todosSlice';
import {styles} from './edit.todo.styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../app/store';

type editScreenProp = StackNavigationProp<RootStackParamList, 'Edit'>;

type editScreenRouteType = RouteProp<RootStackParamList, 'Edit'>;

export const EditTodoForm = () => {
  const [inputValue, setInputValue] = React.useState('');

  const dispatch = useAppDispatch();

  const navigation = useNavigation<editScreenProp>();

  const {
    params: {isUpdate, todoId},
  } = useRoute<editScreenRouteType>();

  const todo = useSelector((state: RootState) =>
    selectTodoById(state, todoId as string),
  );

  useFocusEffect(
    useCallback(() => {
      const name = isUpdate ? 'EDIT TODO' : 'ADD TODO';
      navigation.setOptions({title: name});
      if (isUpdate) {
        const updateDescription = todo?.description ?? '';
        setInputValue(updateDescription);
      }
    }, [navigation, isUpdate, todo]),
  );

  const clearInput = () => {
    Keyboard.dismiss();
    setInputValue('');
  };

  function throwExpression(errorMessage: string): never {
    throw new Error(errorMessage);
  }

  const onEditTodo = () => {
    if (isUpdate && inputValue.trim().length > 0) {
      dispatch(
        todoEdited({
          id: todoId ?? throwExpression('The todo ID is undefined'),
          isCompleted:
            todo?.isCompleted ??
            throwExpression("The 'isCompleted' parameter of todo is undefined"),
          description: inputValue,
        }),
      );
    } else if (inputValue.trim().length > 0) {
      dispatch(todoAdded(inputValue));
    }
    clearInput();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={true}
          placeholder="Enter todo..."
          style={styles.textInput}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          onSubmitEditing={onEditTodo}
        />
        <TouchableOpacity
          onPress={clearInput}
          style={styles.clearIconContainer}>
          <Text style={styles.texticonClose}> &#10005;</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isUpdate ? 'Save todo' : 'Add todo'}
          onPress={onEditTodo}
          disabled={!inputValue}
        />
      </View>
    </SafeAreaView>
  );
};

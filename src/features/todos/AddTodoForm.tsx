import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  Keyboard,
} from 'react-native';
import {useAppDispatch} from '../../app/hooks';
import {todoAdded} from './todosSlice';

export const AddTodoForm = () => {
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useAppDispatch();
  const clearInput = () => {
    Keyboard.dismiss();
    setInputValue('');
  };
  const onAddTodo = () => {
    if (inputValue.trim().length > 0) {
      dispatch(todoAdded(inputValue));
    }
    clearInput();
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter todo..."
          style={styles.textInput}
          onChangeText={(text) => setInputValue(text)}
          value={inputValue}
          onSubmitEditing={onAddTodo}
        />
        <TouchableOpacity
          onPress={clearInput}
          style={styles.clearIconContainer}>
          <Text style={styles.texticonClose}> &#10005;</Text>
        </TouchableOpacity>
      </View>
      <Button title="Add todo" onPress={onAddTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    width: '80%',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 2,
    fontSize: 20,
  },
  texticonClose: {
    fontSize: 16,
    textAlign: 'center',
  },
  clearIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    padding: 10,
  },
});

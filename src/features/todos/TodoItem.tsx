import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Todo} from '../../models/todo';
import {useAppDispatch} from '../../app/hooks';
import {todoDeleted, todoEdited, todoToggled} from './todosSlice';

export const TodoItem = ({item}: {item: Todo}) => {
  const dispatch = useAppDispatch();
  const onDeleteTodo = () => {
    console.debug('>>>> item id = ', item.id);
    dispatch(todoDeleted(item.id));
  };
  const onToggle = () => {
    dispatch(todoToggled(item.id));
  };

  return (
    <TouchableOpacity style={styles.todo}>
      <CheckBox
        style={styles.checkbox}
        disabled={false}
        value={item.isCompleted}
        onValueChange={onToggle}
        tintColors={{true: '#348FEB', false: 'black'}}
      />
      <TextInput
        style={
          item.isCompleted
            ? styles.textTodoCompleted
            : styles.textTodoNotCompleted
        }
        onChangeText={(newDescription) =>
          dispatch(
            todoEdited({
              id: item.id,
              isCompleted: item.isCompleted,
              description: newDescription,
            }),
          )
        }
        value={item.description}
      />
      <TouchableOpacity onPress={onDeleteTodo}>
        <View style={styles.viewIconClose}>
          <Text style={styles.textIconClose}> &#10005;</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    marginStart: 10,
  },
  todo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textTodoNotCompleted: {
    fontSize: 20,
    padding: 16,
    margin: 10,
    width: '70%',
  },
  textTodoCompleted: {
    fontSize: 20,
    padding: 16,
    margin: 10,
    width: '70%',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  textIconClose: {
    fontSize: 16,
    textAlign: 'center',
  },
  viewIconClose: {
    alignItems: 'center',
    margin: 20,
    paddingEnd: 10,
  },
});

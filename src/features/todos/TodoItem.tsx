import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Todo} from '../../models/todo';
import {useAppDispatch} from '../../app/hooks';
import {todoDeleted, todoToggled} from './todosSlice';
import {styles} from './todoitem.styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {useNavigation} from '@react-navigation/native';

type todosScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const TodoItem = ({item}: {item: Todo}) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation<todosScreenProp>();

  const onDeleteTodo = () => {
    dispatch(todoDeleted(item.id));
  };

  const onToggle = () => {
    dispatch(todoToggled(item.id));
  };

  const onEditTodo = () => {
    navigation.navigate('Edit', {isUpdate: true, todoId: item.id});
  };

  return (
    <TouchableOpacity style={styles.todo} onPress={onEditTodo}>
      <CheckBox
        style={styles.checkbox}
        disabled={false}
        value={item.isCompleted}
        onValueChange={onToggle}
        tintColors={{true: '#348FEB', false: 'black'}}
      />
      <Text
        style={
          item.isCompleted
            ? styles.textTodoCompleted
            : styles.textTodoNotCompleted
        }>
        {item.description}
      </Text>
      <TouchableOpacity onPress={onDeleteTodo}>
        <View style={styles.viewIconClose}>
          <Text style={styles.textIconClose}> &#10005;</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

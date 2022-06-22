import React from 'react';
import {View, FlatList} from 'react-native';
import {useAppSelector} from '../../app/hooks';
import {TodoItem} from './TodoItem';
import {selectTodos} from './todosSlice';
import {Todo} from '../../models/todo';
import {AddTodoForm} from './AddTodoForm';

export function Todos() {
  const todos = useAppSelector(selectTodos);

  return (
    <View>
      <AddTodoForm />
      <FlatList
        data={todos}
        keyExtractor={(item: Todo) => item.id}
        renderItem={({item}) => <TodoItem item={item} />}
      />
    </View>
  );
}

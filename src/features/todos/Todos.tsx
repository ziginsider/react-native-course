import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useAppSelector} from '../../app/hooks';
import {TodoItem} from './TodoItem';
import {selectTodos} from './todosSlice';
import {Todo} from '../../models/todo';
import {AddTodoForm} from './AddTodoForm';

export function Todos() {
  const todos = useAppSelector(selectTodos);

  const emptyState = () => {
    return <Text style={styles.emptyState}> empty list</Text>;
  };

  return (
    <View>
      <AddTodoForm />
      <FlatList
        ListEmptyComponent={emptyState}
        data={todos}
        keyExtractor={(item: Todo) => item.id}
        renderItem={({item}) => <TodoItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    marginTop: 200,
    fontSize: 20,
    color: '#4f4f4f',
    textAlign: 'center',
  },
});

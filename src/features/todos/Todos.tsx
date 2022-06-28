import React from 'react';
import {styles} from './todos.styles';
import {View, FlatList, Text, Button} from 'react-native';
import {useAppSelector} from '../../app/hooks';
import {TodoItem} from './TodoItem';
import {selectUncompletedTodos, selectCompletedTodos} from './todosSlice';
import {Todo} from '../../models/todo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/RootStackParams';
import {useNavigation} from '@react-navigation/native';

type todosScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const Todos = ({isShowCompleted}: {isShowCompleted: boolean}) => {
  const todos = useAppSelector(
    isShowCompleted ? selectCompletedTodos : selectUncompletedTodos,
  );

  const navigation = useNavigation<todosScreenProp>();

  const onGoToAddTodoHandler = () => {
    navigation.navigate('Edit', {isUpdate: false});
  };

  const emptyState = () => {
    return (
      <View style={styles.containerEmpty}>
        <Text style={styles.emptyState}> empty list</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListEmptyComponent={emptyState}
        data={todos}
        keyExtractor={(item: Todo) => item.id}
        renderItem={({item}) => <TodoItem item={item} />}
      />
      <View style={styles.button}>
        <Button title="Go to Add todo" onPress={onGoToAddTodoHandler} />
      </View>
    </SafeAreaView>
  );
};

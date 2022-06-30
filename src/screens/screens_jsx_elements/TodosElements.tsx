import React from 'react';
import {styles} from '../../features/todos/todos.styles';
import {View, Text} from 'react-native';

export const emptyState = () => {
  return (
    <View style={styles.containerEmpty}>
      <Text style={styles.emptyState}>Empty list</Text>
    </View>
  );
};

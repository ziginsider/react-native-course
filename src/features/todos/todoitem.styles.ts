import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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

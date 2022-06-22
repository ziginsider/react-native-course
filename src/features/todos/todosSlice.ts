import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Todo} from '../../models/todo';
import uuid from 'react-native-uuid';

const initialState: Todo[] = [
  {
    id: uuid.v4(),
    isCompleted: false,
    description: 'initial todo',
  } as Todo,
];

const sortTodosByComplete = function (c1: boolean, c2: boolean) {
  if (c1 && !c2) {
    return 1;
  }
  if (c2 && !c1) {
    return -1;
  }
  return 0;
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded: (state, action: PayloadAction<string>) => {
      state.push({
        id: uuid.v4(),
        isCompleted: false,
        description: action.payload,
      } as Todo);
      state.sort((item1, item2) =>
        sortTodosByComplete(item1.isCompleted, item2.isCompleted),
      );
    },
    todoToggled: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo !== undefined) {
        todo.isCompleted = !todo.isCompleted;
      }
      state.sort((item1, item2) =>
        sortTodosByComplete(item1.isCompleted, item2.isCompleted),
      );
    },
    todoDeleted: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    todoEdited: (state, action: PayloadAction<Todo>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo !== undefined) {
        todo.description = action.payload.description;
      }
    },
  },
});

export const {todoAdded, todoToggled, todoDeleted, todoEdited} =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos;

export default todosSlice.reducer;

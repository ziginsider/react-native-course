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
    },
    todoToggled: (state, action: PayloadAction<string>) => {
      const toggledTodo = state.find((todo) => todo.id === action.payload);
      if (toggledTodo !== undefined) {
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
      }
    },
    todoDeleted: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    todoEdited: (state, action: PayloadAction<Todo>) => {
      const editedTodo = state.find((todo) => todo.id === action.payload.id);
      if (editedTodo !== undefined) {
        editedTodo.description = action.payload.description;
      }
    },
  },
});

export const {todoAdded, todoToggled, todoDeleted, todoEdited} =
  todosSlice.actions;

export const selectUncompletedTodos = (state: RootState) =>
  state.todos.filter((todo) => !todo.isCompleted);

export const selectCompletedTodos = (state: RootState) =>
  state.todos.filter((todo) => todo.isCompleted);

export const selectTodoById = (state: RootState, id: string) =>
  state.todos.find((todo) => todo.id === id);

export default todosSlice.reducer;

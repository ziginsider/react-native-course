import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Todo, TodoData} from '../../models/todo';
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
    todoAdded: (state, action: PayloadAction<TodoData>) => {
      state.push({
        id: uuid.v4(),
        isCompleted: false,
        description: action.payload.description,
        coordinates: action.payload.coordinates,
        photoUrl: action.payload.photoUrl,
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
        editedTodo.coordinates = action.payload.coordinates;
        editedTodo.photoUrl = action.payload.photoUrl;
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

export const selectTodosCoordinates = (state: RootState) =>
  state.todos
    .map((todo) => todo.coordinates)
    .filter((coordinate) => coordinate !== undefined);

export default todosSlice.reducer;

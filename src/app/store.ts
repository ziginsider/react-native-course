import {configureStore, combineReducers} from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['todosReducer'],
  blacklist: [],
};

const rootReducer = combineReducers({
  todosReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const store = createStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import Unpersisted_counterslice from "./slices/unpersisted_counter";
import User_Slice from "./slices/User_Slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
  counter: counterSlice,
  // Add other reducers here:
  // anotherSlice: anotherSliceReducer,
  Unpersisted_counter: Unpersisted_counterslice ,
  User:User_Slice
});

const persistConfig = {
  key: 'root',
  storage: storageSession,
  // Optionally specify whitelist or blacklist to control persistence:
  // whitelist: ['counter'],
  // blacklist: ['otherSlice'],
  blacklist : ["Unpersisted_counter"]//write the key of the slice in the rootReducer
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,  // Pass persistedReducer as the reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store); // Create persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

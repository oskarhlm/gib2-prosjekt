import { configureStore, combineReducers } from '@reduxjs/toolkit';
import drivingDistanceReducer from 'ducks/drivingDistanceSlice';
import locationReducer from 'ducks/locationsSlice';

const rootReducer = combineReducers({
  drivingDistance: drivingDistanceReducer,
  locations: locationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;

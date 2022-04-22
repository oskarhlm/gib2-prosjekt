import { configureStore, combineReducers } from '@reduxjs/toolkit';
import drivingDistanceReducer from 'ducks/drivingDistanceSlice';
import locationReducer from 'ducks/locationsSlice';
import POIReducer from 'ducks/POISlice';
import pathReducer from 'ducks/pathSlice';

const rootReducer = combineReducers({
  drivingDistance: drivingDistanceReducer,
  locations: locationReducer,
  POI: POIReducer,
  path: pathReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;

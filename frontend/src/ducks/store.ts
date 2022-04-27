import { configureStore, combineReducers } from '@reduxjs/toolkit';
import drivingDistanceReducer from 'ducks/polygonSlice';
import locationReducer from 'ducks/locationsSlice';
import POIReducer from 'ducks/POISlice';
import pathReducer from 'ducks/pathSlice';
import categoriesUsedReducer from 'ducks/categoriesUsedSlice';

const rootReducer = combineReducers({
  polygon: drivingDistanceReducer,
  locations: locationReducer,
  POI: POIReducer,
  path: pathReducer,
  categoriesUsed: categoriesUsedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;

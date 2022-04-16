import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  lat: number;
  lng: number;
}

interface ILocations {
  userLocation: LocationState;
  destination: LocationState | null;
}

const initialState = { destination: null } as ILocations;

const locationsSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation(state, action: PayloadAction<LocationState>) {
      state.userLocation = action.payload;
    },
    setDestination(state, action: PayloadAction<LocationState | null>) {
      state.destination = action.payload;
    },
  },
});

export const { setUserLocation, setDestination } = locationsSlice.actions;
export default locationsSlice.reducer;

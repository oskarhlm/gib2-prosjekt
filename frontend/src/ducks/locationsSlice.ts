import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  lat: number;
  lng: number;
}

interface ILocations {
  userLocation: LocationState;
  destination: {
    loc: LocationState | null;
    isNew?: boolean;
  };
}

const initialState = { destination: { loc: null } } as ILocations;

const locationsSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation(state, action: PayloadAction<LocationState>) {
      state.userLocation = action.payload;
    },
    setDestination(state, action: PayloadAction<ILocations['destination']>) {
      state.destination = action.payload;
    },
  },
});

export const { setUserLocation, setDestination } = locationsSlice.actions;
export default locationsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  lat: number;
  lng: number;
}

const initialState = {} as LocationState;

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<LocationState>) {
      return action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;

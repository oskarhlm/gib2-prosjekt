import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrivingDistanceState {
  startPosition: [number, number];
  maxMinutes: number;
  roundTrip: boolean;
  maxSlope: number;
  experience?: number;
}

const initialState = {} as DrivingDistanceState;

const drivingDistanceSlice = createSlice({
  name: 'drivingDistance',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<DrivingDistanceState>) {
      return action.payload;
    },
  },
});

export const { updateSettings } = drivingDistanceSlice.actions;
export default drivingDistanceSlice.reducer;

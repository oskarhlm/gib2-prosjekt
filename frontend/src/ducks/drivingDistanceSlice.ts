import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DrivingDistanceState {
  startPosition: [number, number];
  maxMinutes: number;
  roundTrip: boolean;
  maxSlope: number;
  experience?: number;
}

const initialState = null as DrivingDistanceState | null;

const drivingDistanceSlice = createSlice({
  name: 'drivingDistance',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<DrivingDistanceState | null>) {
      return action.payload;
    },
  },
});

export const { updateSettings } = drivingDistanceSlice.actions;
export default drivingDistanceSlice.reducer;

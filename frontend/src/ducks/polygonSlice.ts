import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Polygon } from 'components/DrivingDistancePolygon';

export interface PolygonState {
  settings: {
    startPosition: [number, number];
    maxMinutes: number;
    roundTrip: boolean;
    maxSlope: number;
    experience?: number;
  } | null;
  polygon: Polygon | null;
  showPolygon: boolean;
}

const initialState = {
  settings: null,
  polygon: null,
  showPolygon: false,
} as PolygonState;

const drivingDistanceSlice = createSlice({
  name: 'drivingDistance',
  initialState,
  reducers: {
    updateSettings(
      state,
      action: PayloadAction<PolygonState['settings'] | null>
    ) {
      console.log('updating settings');
      state.settings = action.payload;
    },
    setPolygon(state, action: PayloadAction<PolygonState['polygon'] | null>) {
      console.log('slice');
      state.polygon = action.payload;
    },
    setShowPolygon(state, action: PayloadAction<boolean>) {
      state.showPolygon = action.payload;
    },
  },
});

export const { updateSettings, setPolygon, setShowPolygon } =
  drivingDistanceSlice.actions;
export default drivingDistanceSlice.reducer;

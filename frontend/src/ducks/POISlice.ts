import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { POI } from 'components/POIMarker';

const initialState: POI[] = [];

const POISlice = createSlice({
  name: 'pointsOfInterest',
  initialState,
  reducers: {
    setPOI(_, action: PayloadAction<POI[]>) {
      return action.payload;
    },
  },
});

export const { setPOI } = POISlice.actions;
export default POISlice.reducer;

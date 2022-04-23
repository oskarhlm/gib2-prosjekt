import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathSegment } from 'components/Path';

const initialState: PathSegment[] = [];

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPathSegments(_, action: PayloadAction<PathSegment[]>) {
      return action.payload;
    },
  },
});

export const { setPathSegments } = pathSlice.actions;
export default pathSlice.reducer;

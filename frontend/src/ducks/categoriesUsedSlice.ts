import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const CategoriesUsedSlice = createSlice({
  name: 'categoriesUsed',
  initialState,
  reducers: {
    setCategoriesUsed(_, action: PayloadAction<string[]>) {
      return action.payload;
    },
  },
});

export const { setCategoriesUsed } = CategoriesUsedSlice.actions;
export default CategoriesUsedSlice.reducer;

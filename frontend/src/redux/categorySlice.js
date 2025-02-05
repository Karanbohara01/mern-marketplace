import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [], // Ensure categories is initialized as an empty array
  },
  reducers: {
    // actions
    setCategories: (state, action) => {
      state.categories = action.payload; // Direct assignment from action.payload
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;

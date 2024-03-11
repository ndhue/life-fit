import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dietGoal: {},
  dietDetail: []
}

const dietSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSaveDietGoal: (state, action) => {
      state.dietGoal = action.payload;
    },
  }
})

export const { 
  doSaveDietGoal
 } = dietSlice.actions;
export default dietSlice.reducer;
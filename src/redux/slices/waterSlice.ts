import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todayGoal: {},
  listHistory: {}
}

const waterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSaveListHistory: (state, action) => {
      state.listHistory = action.payload;
    },
  }
})

export const { 
  doSaveListHistory
 } = waterSlice.actions;
export default waterSlice.reducer;
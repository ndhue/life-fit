import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
  email: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSaveUser: (state, action) => {
      state.userId = action.payload.userId
    },
    doSaveEmail: (state, action) => {
      state.email = action.payload.email
    },
  }
})

export const { 
  doSaveUser,
  doSaveEmail
 } = authSlice.actions;
export default authSlice.reducer;
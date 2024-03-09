import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  email: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSaveUser: (state, action) => {
      state.token = action.payload.token
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
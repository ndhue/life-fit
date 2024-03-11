import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  email: "",
  profile: {
    email: "",
    fullname: "",
    birthday: "",
    gender: "",
    age: 0,
    weight: 0,
    height: 0,
    wakeup_time: "",
    sleeping_time: "",
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSaveUser: (state, action) => {
      state.token = action.payload
    },
    doSaveEmail: (state, action) => {
      state.email = action.payload.email
    },
    doSaveProfile: (state, action) => {
      state.profile = action.payload
    },
  }
})

export const { 
  doSaveUser,
  doSaveEmail,
  doSaveProfile
 } = authSlice.actions;
export default authSlice.reducer;
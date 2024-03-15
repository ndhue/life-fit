import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  email: "",
  signUpData: {
    email: "",
    fullname: "",
    birthday: "",
    password: "",
    confirmpassword: ""
  },
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
    id: 0
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
    doSaveSignUpData: (state, action) => {
      state.signUpData = action.payload.signUpData
    },
    doClearSignUpData: (state) => {
      state.signUpData = {
        email: "",
        fullname: "",
        birthday: "",
        password: "",
        confirmpassword: ""
      }
    },
    doSaveProfile: (state, action) => {
      state.profile = action.payload
    },
  }
})

export const { 
  doSaveUser,
  doSaveEmail,
  doSaveSignUpData,
  doClearSignUpData,
  doSaveProfile
 } = authSlice.actions;
export default authSlice.reducer;
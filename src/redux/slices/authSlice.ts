import { createSlice } from "@reduxjs/toolkit";
import { formatTime } from "../../toast/formatter";
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
    doUpdateProfile: (state, action) => {
      const updated = {
        ...state.profile,
        gender: action.payload.gender,
        height: action.payload.height,
        weight: action.payload.weight,
        wakeup_time: formatTime(action.payload.wakeup_time),
        sleeping_time: formatTime(action.payload.sleeping_time),
      }
      state.profile = updated;
    }
  }
})

export const { 
  doSaveUser,
  doSaveEmail,
  doSaveSignUpData,
  doClearSignUpData,
  doSaveProfile,
  doUpdateProfile
 } = authSlice.actions;
export default authSlice.reducer;
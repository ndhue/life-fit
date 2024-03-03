import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_APP_BASE_URL
  }),
  reducerPath: 'adminApi',
  tagTypes: [],
  endpoints: (build) => ({
    authLogin: build.mutation({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    signUp: build.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    sendOtp: build.mutation({
      query: (data) => ({
        url: '/send-otp',
        method: 'POST',
        body: data,
      }),
    }),
    authOtp: build.mutation({
      query: (data) => ({
        url: '/otpauthen',
        method: 'POST',
        body: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: '/updatepassword',
        method: 'POST',
        body: data,
      }),
    }),
  })
})

export const { 
  useAuthLoginMutation,
  useSignUpMutation,
  useSendOtpMutation,
  useAuthOtpMutation,
  useUpdatePasswordMutation
 } = api;
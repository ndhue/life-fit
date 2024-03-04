import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL
  }),
  reducerPath: 'adminApi',
  tagTypes: [],
  endpoints: (build) => ({
    authLogin: build.mutation({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    signUp: build.mutation({
      query: (userData) => ({
        url: '/register',
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
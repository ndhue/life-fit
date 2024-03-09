import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL
  }),
  reducerPath: 'adminApi',
  tagTypes: ["Profile", 'Weight'],
  endpoints: (build) => ({
    // Authentication
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
    // register
    signUp: build.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    accountAuthen: build.mutation({
      query: (data) => ({
        url: '/otpaccount',
        method: 'POST',
        body: data,
      }),
    }),
    saveAccount: build.mutation({
      query: (data) => ({
        url: '/saveInfor',
        method: 'POST',
        body: data,
      }),
    }),
    // Set up profile
    setUpProfile: build.mutation({
      query: (data) => ({
        url: '/inforprofile',
        method: 'POST',
        body: data,
      }),
    }),
    // Reset Password
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
    // Authorized ID
    authorizedUser: build.mutation({
      query: () => ({
        url: '/inforprofile',
        method: 'POST'
      })
    }),
    // Get profile
    getUserProfile: build.query({
      query: () => '/getprofile',
      providesTags: ["Profile"]
    }),
    // Update profile
    updateProfile: build.mutation({
      query: (data) => ({
        url: '/updateprofile',
        method: 'PUT',
        body: data,
      }),
    }),
    // Weight
    getUserWeight: build.query({
      query: () => '/getweight',
      providesTags: ['Weight']
    }),
    updateUserWeight: build.mutation({
      query: (data) => ({
        url: '/updateweight',
        method: 'PUT',
        body: data,
      })
    }),
    deleteUserWeight: build.mutation({
      query: (data) => ({
        url: '/deleteweight',
        method: 'DELETE',
        body: data,
      })
    }),
    // Period
  })
})

export const { 
  useAuthLoginMutation,
  useSignUpMutation,
  useAccountAuthenMutation,
  useSaveAccountMutation,
  useSetUpProfileMutation,
  useSendOtpMutation,
  useAuthOtpMutation,
  useUpdatePasswordMutation,
  useAuthorizedUserMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
 } = api;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["Profile", "Weight", "Water", "Diet", "DietDetail"],
  endpoints: (build) => ({
    // Authentication
    authLogin: build.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    // register
    signUp: build.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    accountAuthen: build.mutation({
      query: (data) => ({
        url: "/otpaccount",
        method: "POST",
        body: data,
      }),
    }),
    saveAccount: build.mutation({
      query: (data) => ({
        url: "/saveInfor",
        method: "POST",
        body: data,
      }),
    }),
    // Set up profile
    setUpProfile: build.mutation({
      query: (data) => ({
        url: "/inforprofile",
        method: "POST",
        body: data,
      }),
    }),
    // Reset Password
    sendOtp: build.mutation({
      query: (data) => ({
        url: "/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    authOtp: build.mutation({
      query: (data) => ({
        url: "/otpauthen",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (data) => ({
        url: "/updatepassword",
        method: "POST",
        body: data,
      }),
    }),
    // Authorized ID
    authorizedUser: build.mutation({
      query: () => ({
        url: "/inforprofile",
        method: "POST",
      }),
    }),
    // Get profile
    getUserProfile: build.query({
      query: (token) => ({
        url: "/getprofile",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Profile"],
    }),
    // Update profile
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/updatedprofile",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Profile"],
    }),
    // Weight
    getUserWeight: build.query({
      query: () => "/getweight",
      providesTags: ["Weight"],
    }),
    updateUserWeight: build.mutation({
      query: (data) => ({
        url: "/updateweight",
        method: "PUT",
        body: data,
      }),
    }),
    deleteUserWeight: build.mutation({
      query: (data) => ({
        url: "/deleteweight",
        method: "DELETE",
        body: data,
      }),
    }),
    // Diet
    getDietGoal: build.query({
      query: (token) => ({
        url: "/getdiet",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Diet"],
    }),
    setDietGoal: build.mutation({
      query: (data) => ({
        url: "/diet",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data.data,
      }),
    }),
    // Add detail diet for date
    addDetailDiet: build.mutation({
      query: (data) => ({
        url: "/dietdetail",
        method: "POST",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DietDetail"],
    }),
    // Get detail diet
    getDetailDiet: build.query({
      query: (token) => ({
        url: "/getdietdetail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["DietDetail"],
    }),
    // edit detail diet
    editDetailDiet: build.mutation({
      query: (data) => ({
        url: "/updatedietdetail",
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DietDetail"],
    }),
    // edit detail diet
    deleteDetailDiet: build.mutation({
      query: (data) => ({
        url: `/deletedietdetail/:${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DietDetail"],
    }),
    // Water
    setWaterGoal: build.mutation({
      query: (data) => {
        return {
          url: "/water",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
    }),
    getWaterList: build.query({
      query: (token) => ({
        url: "/getwater",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Water"],
    }),
  }),
});

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
  useGetDietGoalQuery,
  useSetDietGoalMutation,
  useAddDetailDietMutation,
  useEditDetailDietMutation,
  useDeleteDetailDietMutation,
  useSetWaterGoalMutation,
  useGetWaterListQuery,
} = api;

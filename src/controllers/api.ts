import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["Profile", "Weight", "Water", "Diet", "DietDetail", "Period", "Heart", "BloodPressure"],
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
    // update weiget
    updateUserWeight: build.mutation({
      query: (data) => ({
        url: "/updateweight",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Weight"],
    }),
    // delete weight
    deleteUserWeight: build.mutation({
      query: (data) => ({
        url: "/deleteweight",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Weight"],
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
    // set diet goal
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
      invalidatesTags: ["Diet"],
    }),
    // update diet
    updateDiet: build.mutation({
      query: (data) => ({
        url: "/updateddiet",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Diet"],
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
      invalidatesTags: ["Water"],
    }),
    // get water
    getWaterList: build.query({
      query: (token) => ({
        url: "/getwater",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Water"],
    }),
    // edit water
    editWater: build.mutation({
      query: (data) => ({
        url: "/updatedwater",
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Water"],
    }),

    // create period
    createPeriod: build.mutation({
      query: (data) => {
        return {
          url: "/createPeriod",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["Period"],
    }),
    // get Period
    getPeriod: build.query({
      query: (token) => ({
        url: "/getPeriod",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Period"],
    }),
    // edit period
    editPeriod: build.mutation({
      query: (data) => ({
        url: `/updateperiod/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Period"],
    }),


    // create heart
    createHeart: build.mutation({
      query: (data) => {
        return {
          url: "/heart",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["Heart"],
    }),
    // get heart
    getHeart: build.query({
      query: (token) => ({
        url: "/getheart",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Heart"],
    }),
    // edit heart
    editHeart: build.mutation({
      query: (data) => ({
        url: `/updatedheart/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Heart"],
    }),

    // create blood pressure
    createBloodPressure: build.mutation({
      query: (data) => {
        return {
          url: "/blood_pressure",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["BloodPressure"],
    }),
    // get blood pressure
    getBloodPressure: build.query({
      query: (token) => ({
        url: "/getblood_pressure",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["BloodPressure"],
    }),
    // edit blood pressure
    editBloodPressure: build.mutation({
      query: (data) => ({
        url: `/updatedblood_pressure/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BloodPressure"],
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
  useUpdateDietMutation,
  useAddDetailDietMutation,
  useGetDetailDietQuery,
  useEditDetailDietMutation,
  useDeleteDetailDietMutation,
  useSetWaterGoalMutation,
  useGetWaterListQuery,
  useEditWaterMutation,

  useGetHeartQuery,
  useCreateHeartMutation,
  useEditHeartMutation,
} = api;

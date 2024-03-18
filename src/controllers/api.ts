import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["Profile", "Weight", "WeightByDate", "Water", "WaterByDate", "Diet", "DietByDate", "DietDetail", "DietDetailByDate", "Period", "Heart", "HeartByDate",  "BloodPressure", "BloodPressureByDate", "CaloByDate", "Activity", "ActivityByDate", "PeriodLengthCurrent", "PeriodLengthPre", "Notification", "WaterHistory"],
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
    // submit otp
    accountAuthen: build.mutation({
      query: (data) => ({
        url: "/otpaccount",
        method: "POST",
        body: data,
      }),
    }),
    // reset otp
    resetOtp:  build.mutation({
      query: (data) => ({
        url: "/resetotpaccount",
        method: "POST",
        body: data,
      }),
    }),
    saveAccount: build.mutation({
      query: (data) => ({
        url: "/saveInfor",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Profile"],
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
    // Submit Otp
    authOtp: build.mutation({
      query: (data) => ({
        url: "/otpauthen",
        method: "POST",
        body: data,
      }),
    }),
     // Update
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
    // Change password
    changePassword: build.mutation({
      query: (data) => ({
        url: "/updatedPassword",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["Profile"]
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
    // get diet by date
    getDietGoalByDate: build.query({
      query: (data) => {
        const { date, token } = data;
        return {
          url: '/getdietBydate',
          params: { date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["DietByDate", "Diet"],
    }),
    // update diet
    updateDiet: build.mutation({
      query: (data) => ({
        url: `/updateddiet/${data.id}`,
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
    // get diet detail by date
    getDetailDietByDate: build.query({
      query: (data) => {
        const { diet_date, token } = data;
        return {
          url: '/getdietdetailBydate',
          params: { diet_date },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      },
      providesTags: ["DietDetailByDate", "DietDetail"],
    }),
    // edit detail diet
    editDetailDiet: build.mutation({
      query: (data) => ({
        url: `/updatedietdetail/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DietDetail", "CaloByDate"],
    }),
     // edit detail diet
     deleteDetailDiet: build.mutation({
      query: (data) => ({
        url: `/deletedietdetail/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["DietDetail", "CaloByDate"],
    }),
    // get calo by Date
    getCaloByDate: build.query({
      query: (data) => {
        const { diet_date, token } = data;
        return {
          url: '/CalodietByDate',
          params: { diet_date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["CaloByDate"]
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
    // get water by date
    getWaterGoalByDates: build.query({
      query: (data) => {
        const { token, dategoal } = data;
        return {
          url: "/getwaterBydate",
          params: { dategoal },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["WaterByDate", "Water"],
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
      invalidatesTags: ["Heart", "HeartByDate"],
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
    // get heart by date
    getHeartByDate: build.query({
      query: (data) => {
        const { token, date } = data;
        return {
          url: "/getheartBydate",
          params: { date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["HeartByDate"],
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
      invalidatesTags: ["Heart", "HeartByDate"],
    }),
    // delete heart
    deleteHeart: build.mutation({
      query: (data) => ({
        url: `/deleteheart/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Heart", "HeartByDate"],
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
      invalidatesTags: ["BloodPressure", "BloodPressureByDate"],
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
    // get blood pressure by date
    getBloodPressureByDate: build.query({
      query: (data) => {
        const { date, token } = data;
        return {
          url: "/getblood_pressureBydate",
          params: { date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["BloodPressureByDate"],
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
      invalidatesTags: ["BloodPressure", "BloodPressureByDate"],
    }),
    // delete blood pressure
    deleteBloodPressure: build.mutation({
      query: (data) => ({
        url: `/deleteblood_pressure/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BloodPressure", "BloodPressureByDate"],
    }),
     // Weight
    getWeightRecord: build.query({
      query: (token) => ({
        url: "/getweightHistory",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Weight"],
    }),
     // Weight by date
     getWeightRecordByDate: build.query({
      query: (data) => {
        const { date, token } = data;
        return {
          url: "/getweightHistoryBydate",
          params: { date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["WeightByDate"],
    }),
    // create new weight record
    createWeightRecord: build.mutation({
      query: (data) => {
        return {
          url: "/weightHistory",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["Weight", "WeightByDate"],
    }),
    // edit weight record
    editWeightRecord: build.mutation({
      query: (data) => ({
        url: `/updateweightHistory/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Weight", "WeightByDate"],
    }),
    // delete weight record
    deleteWeightRecord: build.mutation({
      query: (data) => ({
        url: `/deleteweightHistory/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Weight", "WeightByDate"],
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
      invalidatesTags: ["Period", "PeriodLengthCurrent", "PeriodLengthPre"],
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
    // get period length current
    getPeriodLengthCurrent: build.query({
      query: (token) => ({
        url: "/getPeriodlengthCurrent",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Period"],
    }),
    // get peripd length previous
    getPeriodLengthPrevious: build.query({
      query: (token) => ({
        url: "/getmenstrualPeriodPre",
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
      invalidatesTags: ["Period", "PeriodLengthCurrent", "PeriodLengthPre"],
    }),


    // create activity
    createActivity: build.mutation({
      query: (data) => {
        return {
          url: "/activity",
          headers: {
            Authorization: `Bearer ${data.token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data.data,
        };
      },
      invalidatesTags: ["Activity", "ActivityByDate"]
    }),
    // Get Activity
    getActivity: build.query({
      query: (token) => ({
        url: "/getactivity",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Activity"],
    }),
     // Get Activity
     getActivityByDate: build.query({
      query: (data) => {
        const { date, token } = data;
        return {
          url: "/getactivityBydate",
          params: { date },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["ActivityByDate"],
    }),
     // edit activity
     editActivity: build.mutation({
      query: (data) => ({
        url: `/updatedactivity/${data.id}`,
        method: "PUT",
        body: data.data,
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Activity", "ActivityByDate", "Notification"],
    }),
    // delete activity
    deleteActivity: build.mutation({
      query: (data) => ({
        url: `/deleteactivity/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Activity", "ActivityByDate"],
    }),
    // get Notification
    getNoti: build.query({
      query: (token) => {
        return {
          url: "/getnoti",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["Notification"],
    }),

    setWaterTrackerHistory: build.mutation({
      query: (data) => ({
        url: "/watertrackerHistory",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["WaterHistory"],
    }),
    getSumWaterByDate: build.query({
      query: (data) => {
        const { dategoal, token } = data;
        return {
          url: "/WaterByDate",
          params: { dategoal },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["WaterHistory"],
    }),
    getWaterHistoryByDate: build.query({
      query: (data) => {
        const { dategoal, token } = data;
        return {
          url: "/getwaterhistoryBydate",
          params: { dategoal },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ["WaterHistory"],
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
  useChangePasswordMutation,

  useGetDietGoalQuery,
  useSetDietGoalMutation,
  useUpdateDietMutation,

  useGetDietGoalByDateQuery,
  useGetDetailDietByDateQuery,

  useAddDetailDietMutation,
  useGetDetailDietQuery,
  useEditDetailDietMutation,
  useDeleteDetailDietMutation,

  useSetWaterGoalMutation,
  useGetWaterListQuery,
  useGetWaterGoalByDatesQuery,
  useEditWaterMutation,

  useGetHeartQuery,
  useGetHeartByDateQuery,
  useCreateHeartMutation,
  useEditHeartMutation,
  useDeleteHeartMutation,

  useGetBloodPressureQuery,
  useGetBloodPressureByDateQuery,
  useCreateBloodPressureMutation,
  useEditBloodPressureMutation,
  useDeleteBloodPressureMutation,

  useGetWeightRecordQuery,
  useGetWeightRecordByDateQuery,
  useCreateWeightRecordMutation,
  useEditWeightRecordMutation,
  useDeleteWeightRecordMutation,

  useGetActivityQuery,
  useGetActivityByDateQuery,
  useCreateActivityMutation,
  useEditActivityMutation,
  useDeleteActivityMutation,

  useGetPeriodQuery,
  useGetPeriodLengthCurrentQuery,
  useGetPeriodLengthPreviousQuery,
  useCreatePeriodMutation,
  useEditPeriodMutation,

  useGetCaloByDateQuery,
  useGetNotiQuery,
  useSetWaterTrackerHistoryMutation,
  useGetWaterHistoryByDateQuery,
  useGetSumWaterByDateQuery
} = api;

import {
  ImageBackground,
  ScrollView,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import { useEffect, useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import { WaterView } from "../../components/WaterView";
import { PeriodView } from "../../components/PeriodView";
import { DietView } from "../../components/DietView";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useGetActivityByDateQuery, useGetDietGoalByDateQuery, useGetPeriodLengthCurrentQuery, useGetUserProfileQuery, useGetWaterGoalByDatesQuery } from "../../controllers/api";
import { ActivityView } from "../../components/ActivityView";
import { doSaveProfile } from "../../redux/slices/authSlice";
import { Redirect, router } from "expo-router";

export default function TabHomeScreen() {
  const [currentTime] = useState(new Date().toISOString());
  const dispatch = useAppDispatch();

  const { token, profile } = useAppSelector(state => state.auth);

  const { data } = useGetUserProfileQuery(token);
  const { data: currentActivity } = useGetActivityByDateQuery({ token, date: currentTime });
  const { data: waterGoal } = useGetWaterGoalByDatesQuery({ dategoal: currentTime, token });
  const { data: dietGoal } = useGetDietGoalByDateQuery({ token, date: currentTime });
  const { data: periodLengthCurrent } = useGetPeriodLengthCurrentQuery(token);

  useEffect(() => {
    if (data) {
      dispatch(doSaveProfile(data.result[0]));
      if(!profile.gender && !data.result[0].gender) {
        router.replace('/set-up-profile')
      }
    }
  }, [data]);
  
  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <ScrollView>
          <HomeHeader username={profile.fullname} />
          <View style={global.container}>
            <ActivityView currentActivity={currentActivity?.result} />
            <PeriodView periodLengthCurrent={periodLengthCurrent}/>
            <DietView dietGoal={dietGoal?.result[0]}/>
            <WaterView waterGoal={waterGoal?.result[0]}/>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

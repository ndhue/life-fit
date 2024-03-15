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
import { useGetUserProfileQuery } from "../../controllers/api";
import { doSaveProfile } from "../../redux/slices/authSlice";
import Header from "../../components/Header";

export default function TabActivityScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useAppDispatch();
  const { token, profile } = useAppSelector(state => ({
    token: state.auth.token,
    profile: state.auth.profile
  
  }));
  const { data } = useGetUserProfileQuery(token);
  
  useEffect(() => {
    if (data) {
      dispatch(doSaveProfile(data[0]));
    }
  }, [data])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <ScrollView>
        <Header title="Hoạt động của tôi" />
          <View style={[global.container]}>
            <PeriodView />
            <DietView />
            <WaterView />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

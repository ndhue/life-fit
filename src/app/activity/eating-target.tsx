import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { useSetDietGoalMutation } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { showToastErrorSetGoal, showToastSuccessSetGoal } from "../../toast/toaster";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import InputField from "../../components/InputField";
import { Calendar } from "react-native-calendars";

const SetDietGoal = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [goal, setGoal] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2024-03-08");
  const [markedDates, setMarkedDates] = useState({});

  const [setDietGoal] = useSetDietGoalMutation();

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const newMarkedDates = { markedDates };
    newMarkedDates[date] = { selected: true, selectedColor: "#00FF66" };
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    handleDateSelect(selectedDate);
  }, []);

  const handleSubmit = async () => {
    const date = new Date();
    const data = { goal, date };
    setIsloading(true);
    try {
      const result = await setDietGoal({data, token});
      console.log("diet goal successful:", result);
      if (result?.data) {
        setIsloading(false);
        showToastSuccessSetGoal();
        setTimeout(() => {
          router.replace("/activity/eating-schedule");
        }, 1000);
      } else {
        setIsloading(false);
        showToastErrorSetGoal();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorSetGoal();
    }
  }
  
  return (
    <>
      <ImageBackground
        source={bg}
        style={global.backgroundImage}
        resizeMode="cover"
      >
        <View style={global.wrapper}>
          <Header
            title="Mục tiêu của tôi"
            main={true}
            route="/activity/eating-schedule"
          />
          <View style={global.container}>
            <View style={styles.water}>
              <Text style={styles.number}>{goal}</Text>
            </View>
            <InputField label="" onChangeText={(t) => setGoal(Number(t))} />

            <View style={{ paddingVertical: 20 }}>
              <LargeButton
                loading={isLoading}
                variant="secondary"
                title="Hoàn tất"
                onPress={handleSubmit}
              />
            </View>
          <Calendar
            onDayPress={day => {
              handleDateSelect(day.dateString);
            }}
            monthFormat={'MM/yyyy'}
            markedDates={markedDates}
            style={{ width: 348, marginTop: 20, borderRadius: 10 }}
            theme={{
              todayTextColor: '#2d4150',
              arrowColor: '#00FF66'
            }}
          />
          </View>
          
        </View>
      </ImageBackground>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  pickerOverlay: {
    marginVertical: 10,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 75,
    overflow: 'hidden'
  },
  picker: {
    width: 260,
    fontSize: 18,
    top: '-92%'
  },
  water: {
    backgroundColor: Colors.primary,
    borderRightColor: "black",
    borderRightWidth: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    height: 120,
    marginTop: 30,
  },
  number: {
    color: "white",
    fontWeight: "700",
    fontSize: 80,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  fixedContainer: {
    position: "fixed",
    height: 350,
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
  },
  options: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 25,
    paddingTop: 10,
  },
  option: {
    borderColor: "#D0DBE2",
    borderWidth: 1,
    borderRadius: 8,
    width: "45%",
    height: 92,
    marginTop: 15,
  },
  optionTitle: {
    color: "#90A5B4",
    fontSize: 14,
    paddingBottom: 10,
  },
  optionTarget: {
    fontSize: 18,
    fontWeight: "600",
  },
});
export default SetDietGoal;

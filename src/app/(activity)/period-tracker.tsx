import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { router } from "expo-router";
import { useAppSelector } from "../../redux/store";
import {
  useGetPeriodLengthCurrentQuery,
  useGetPeriodLengthPreviousQuery,
  useGetPeriodQuery,
} from "../../controllers/api";
import { Calendar } from "react-native-calendars";

const PeriodTracker = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [selectedDays, setSelectedDays] = useState({});

  const { data: period } = useGetPeriodQuery(token);
  const { data: periodLengthCurrent } = useGetPeriodLengthCurrentQuery(token);
  const { data: periodLengthPrev } = useGetPeriodLengthPreviousQuery(token);

  useEffect(() => {
    if (period) {
      const updatedSelectedDays = {};
      period.period.forEach(period => {
        const menstrualDaysArray = period.menstrual_days.split(',');
        menstrualDaysArray.forEach(day => {    
          updatedSelectedDays[day] = { selected: true, selectedColor: '#FF1E52' };
        });
      });
      setSelectedDays(prevState => ({
        ...prevState,
        ...updatedSelectedDays
      }));
    }
  }, [period]);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Chu kì kinh nguyệt" route="/" main={true} />
        <ScrollView>
          <View style={global.container}>
            <View style={styles.circle}>
              <View style={styles.line}>
                <View style={styles.summarized}>
                  {periodLengthCurrent?.lengthperiod ? (
                    <>
                      <Text style={styles.text1}>Kỳ kinh:</Text>
                      <Text style={styles.text2}>
                        Ngày {periodLengthCurrent?.lengthperiod}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.text1}>Chưa có dữ liệu</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
            {periodLengthCurrent?.lengthperiod ?
              <LargeButton
                variant="secondary"
                title="Chỉnh sửa chu kì"
                onPress={() => router.push({ pathname: "/edit-period", params: { id }})}
              />
              : <LargeButton
              variant="secondary"
              title="Thêm chu kì mới"
              onPress={() => router.push("/edit-period")}
            /> }
            </View>
            <Calendar
              monthFormat={'MM/yyyy'}
              markedDates={selectedDays}
              style={{ width: 348, marginTop: 20, borderRadius: 10 }}
              theme={{
                todayTextColor: '#2d4150',
                arrowColor: '#FF1E52',
                
              }}
            />
            <View style={styles.info}>
              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Độ dài chu kì trước</Text>
                  <Text style={styles.subDetail}>36 ngày</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>BẤT THƯỜNG</Text>
                </View>
              </View>
              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Độ dài kỳ kinh trước</Text>
                  <Text style={styles.subDetail}>
                    {periodLengthPrev?.periodLengthDay} ngày
                  </Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>BÌNH THƯỜNG</Text>
                </View>
              </View>
              <View style={[{ paddingVertical: 8 }, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Thay đổi về độ dài chu kỳ</Text>
                  <Text style={styles.subDetail}>30-40 ngày</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>KHÔNG ĐỀU</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    backgroundColor: "#FF1E52",
    borderRadius: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderColor: "white",
    borderWidth: 3,
    width: 225,
    height: 225,
    borderRadius: 225,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  summarized: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  text2: {
    fontSize: 38,
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    paddingBottom: 10,
  },
  info: {
    width: "90%",
    position: "relative",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    marginTop: 20
  },
  borderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    paddingVertical: 8,
  },
  subTitle: {
    color: "#adadad",
    fontWeight: "600",
  },
  subDetail: {
    fontWeight: "600",
    fontSize: 18,
  },
  conclusion: {
    color: "#6b6b6b",
    fontWeight: "700",
  },
});
export default PeriodTracker;

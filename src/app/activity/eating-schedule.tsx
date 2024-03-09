import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { router } from "expo-router";

const EatingSchedule = () => {
  const [selectedDate, setSelectedDate] = useState('2024-03-08');
  const [markedDates, setMarkedDates] = useState({});

  const handleDateSelect = (date) => {
    // Update selected date
    setSelectedDate(date);

    // Add or remove dot from the selected date
    const newMarkedDates = { markedDates };
    newMarkedDates[date] = { selected: true, selectedColor: '#00FF66' };
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    handleDateSelect(selectedDate);
  }, [])

  return (
    <ImageBackground 
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <Header title="Chế độ ăn" route="/activity" main={true} />
        <View style={global.container}>
          <View style={styles.circle}>
            <View style={styles.line}>
              <View style={styles.summarized}>
                <Text style={styles.text1}>Mục tiêu:</Text>
                <Text style={styles.text2}>500 kalo/ngày</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 20}}>
            <LargeButton variant="secondary" title="Đặt mục tiêu mới" onPress={() => router.replace('/activity/eating-target')} />
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
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 204,
    height: 204,
    backgroundColor: "#00FF66",
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    borderColor: 'white',
    borderWidth: 3,
    width: 190,
    height: 190,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  summarized: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150
  },
  text1: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
    paddingBottom: 8
  },
  text2: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 20
  }
})
export default EatingSchedule;

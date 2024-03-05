import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text, View } from "react-native";
import { global } from "../constants/Global";
import Header from "../components/Header";

const EditPeriod = () => {
  const [selectedDate, setSelectedDate] = useState('2024-03-08');
  const [markedDates, setMarkedDates] = useState({});

  const handleDateSelect = (date) => {
    // Update selected date
    setSelectedDate(date);

    // Add or remove dot from the selected date
    const newMarkedDates = { markedDates };
    newMarkedDates[date] = { selected: true, selectedColor: '#FF1E52' };
    setMarkedDates(newMarkedDates);
  };

  useEffect(() => {
    handleDateSelect(selectedDate);
  }, []);

  return (
    <View style={global.wrapper}>
      <Header title="Chu kì kinh nguyệt" route="/period-tracker" main={true} />
      <View style={[global.container, { paddingVertical: 20}]}>
       <View style={{ width: '100%'}}>
        <Text
            style={{
              color: "#2d4150",
              textAlign: 'left',
              paddingLeft: 10
            }}
          >Chọn ngày rụng dâu</Text>
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
            arrowColor: '#FF1E52',
            
          }}
        />
      </View>
    </View>
  );
};

export default EditPeriod;

import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { ImageBackground, Text, View } from "react-native";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { useLocalSearchParams } from "expo-router";
import { useGetPeriodQuery } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";

const EditPeriod = () => {
  const { token } = useAppSelector(state => state.auth);
  const params = useLocalSearchParams();
  const [selectedDays, setSelectedDays] = useState({});

  const { data: period } = useGetPeriodQuery(token);
  
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

  const handleDayPress = (day) => {
    const date = day.dateString;
    const newSelectedDays = { ...selectedDays };

    // Toggle selection
    if (selectedDays[date]) {
      delete newSelectedDays[date];
    } else {
      newSelectedDays[date] = { selected: true, selectedColor: '#FF1E52' };
    }

    setSelectedDays(newSelectedDays);
  }

  return (
    <ImageBackground 
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
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
            onDayPress={handleDayPress}
            monthFormat={'MM/yyyy'}
            markedDates={selectedDays}
            style={{ width: 348, marginTop: 20, borderRadius: 10 }}
            theme={{
              todayTextColor: '#2d4150',
              arrowColor: '#FF1E52',
              
            }}
          />
          <View style={{ paddingVertical: 20}}>
            <LargeButton variant="secondary" title="Lưu" />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default EditPeriod;

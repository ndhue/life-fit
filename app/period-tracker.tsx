import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import Button from "../components/Button";

const PeriodTracker = () => {
  return (
    <View style={global.wrapper}>
      <Header title="Chu kì kinh nguyệt" />
      <View style={global.container}>
        <View style={styles.circle}>
          <View style={styles.line}>
            <View style={styles.summarized}>
              <Text style={styles.text1}>Ngày 28</Text>
              <Text style={styles.text2}>Chu kì đã kéo dài: 4 ngày</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 20}}>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 204,
    height: 204,
    backgroundColor: "#FF1E52",
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
export default PeriodTracker;

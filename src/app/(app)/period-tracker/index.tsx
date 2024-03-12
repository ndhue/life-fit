import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { bg, global } from "../../../constants/Global";
import Header from "../../../components/Header";
import LargeButton from "../../../components/LargeButton";
import { router } from "expo-router";

const PeriodTracker = () => {
  return (
    <ImageBackground 
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <Header title="Chu kì kinh nguyệt" />
        <View style={global.container}>
          <View style={styles.circle}>
            <View style={styles.line}>
              <View style={styles.summarized}>
                <Text style={styles.text1}>Kỳ kinh:</Text>
                <Text style={styles.text2}>Ngày 3</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingVertical: 20}}>
            <LargeButton variant="secondary" title="Chỉnh sửa chu kì" onPress={() => router.replace('/activity/edit-period')} />
          </View>
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
                <Text style={styles.subDetail}>7 ngày</Text>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    borderColor: 'white',
    borderWidth: 3,
    width: 225,
    height: 225,
    borderRadius: 225,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  summarized: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  text2: {
    fontSize: 38,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    paddingBottom: 10
  },
  info: {
    width: '90%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
  },
  borderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    paddingVertical: 8
  },
  subTitle: {
    color: '#adadad',
    fontWeight: '600'
  },
  subDetail: {
    fontWeight: '600',
    fontSize: 18
  },
  conclusion: {
    color: '#6b6b6b',
    fontWeight: '700',
  }
})
export default PeriodTracker;

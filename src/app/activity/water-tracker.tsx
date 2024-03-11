import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import { router } from "expo-router";
import { useGetWaterListQuery } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { formatDate, formatTime } from "../../toast/formatter";

const WaterTracker = () => {
  const { token } = useAppSelector(state => state.auth);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [listGoal, setListGoal] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({});
  
  const { data } = useGetWaterListQuery(token);

  useEffect(() => {
    if(data) {
      setListGoal(data.slice(-6, -1));
      setCurrentGoal(data[data.length-1]);
    }
  }, [data]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <Header title="Chế độ uống nước" route="/activity" main={true} />
        <View style={global.container}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/water-dashboard.png")}
              style={styles.img}
            />
            <View style={styles.content}>
              <Text style={styles.time}>{formatTime(currentTime)}</Text>
              <Text style={styles.qty}>400ml (1 Ly)</Text>

              <View style={{ paddingTop: 40 }}>
                <Pressable onPress={() => router.push('/activity/edit-water-tracker')} style={styles.button}>
                  <Text style={{ color: 'black', fontWeight: '500' }}>Đặt mục tiêu</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View>
              <Image source={require("../../assets/images/process.png")} />
              <Text style={styles.target}>500ml</Text>
            </View>

            <View style={styles.targetContainer}>
              <Text style={{ color: "#90A5B4", fontSize: 15 }}>Mục tiêu</Text>
              <Text style={{ fontSize: 22, fontWeight: "600", paddingTop: 10 }}>
                2000ml
              </Text>
            </View>
          </View>

          <View style={styles.info}>
            {listGoal && listGoal?.map((goal,index) => (
              <View style={[styles.borderInfo, global.flexBox]} key={index}>
              <View>
                <Text style={styles.subTitle}>{formatDate(new Date(goal.dategoal))}</Text>
                <Text style={styles.subDetail}>{goal.watergoal}ml</Text>
              </View>
              <View>
                <Text style={styles.conclusion}>HOÀN THÀNH</Text>
              </View>
            </View>
            ))}
          </View>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: '90%',
    height: 180,
    borderRadius: 15,
    marginTop: 30
  },
  content: {
    position: "absolute",
    top: 15,
    left: 30,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  time: {
    fontSize: 28,
    fontWeight: "600",
  },
  qty: {
    fontSize: 16,
    color: "#90A5B4",
    fontWeight: "500",
  },
  target: {
    color: "white",
    fontWeight: "700",
    fontSize: 22,
    position: "absolute",
    top: "60%",
    left: "14%",
  },
  targetContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 160,
    position: "absolute",
    right: "5%",
    top: "20%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "white",
  },
  info: {
    width: '90%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20
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
});
export default WaterTracker;

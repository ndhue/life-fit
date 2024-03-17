import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { formatDate } from "../toast/formatter";
import { global } from "../constants/Global";
import Checkbox from "./Checkbox";
import { ScrollView } from "react-native-gesture-handler";

interface props {
  currentActivity: [];
}

export const ActivityView = ({ currentActivity }: props) => {
  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  const [sortedList, setSortedList] = useState([]);
  
  useEffect(() => {
    if (currentActivity) {
      const array = [...currentActivity].sort((a, b) => {
        if (a.goal === 0 && b.goal === 1) {
          return -1;
        }
        else if (a.goal === 1 && b.goal === 0) {
          return 1;
        }
        else {
          return 0;
        }
      });
      setSortedList(array);
    }
  }, [currentActivity]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{formatDate(currentTime)}</Text>
      <ScrollView>
        {currentActivity?.length !== 0 ? (
          sortedList.map((activity) => (
            <View
              style={[global.flexBox, { paddingVertical: 10, backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: '#d1d1d1' }]}
              key={activity.id}
            >
              <Text
                style={
                  activity.goal ? styles.textFinished : styles.textUnfinished
                }
              >
                {activity.name}
              </Text>
              <Checkbox activity={activity} />
            </View>
          ))
        ) : (
          <View style={{ display: 'flex', justifyContent: 'center', alignItems:'center'}}>
            <Text style={styles.textUnfinished}>Chưa có hoạt động</Text>
            <Pressable
              onPress={() => router.push("/activity")}
              style={styles.button}
            >
              <Text style={{ color: "black", fontWeight: "500", textAlign: 'center' }}>
                Tạo hoạt động
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "90%",
    height: 162,
    borderRadius: 8,
    padding: 20,
    backgroundColor: 'white', 
    shadowColor: 'gray', 
    shadowOpacity: 0.5, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  text1: {
    color: "#adadad",
    fontWeight: "500",
    fontSize: 12,
    paddingBottom: 8,
  },
  textFinished: {
    color: "#adadad",
    fontSize: 15,
    textDecorationLine: "line-through",
  },
  textUnfinished: {
    color: "#6e6e6e",
    fontSize: 15,
    fontWeight: "500",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#90A5B433",
  },
});

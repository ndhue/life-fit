import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export const DietView = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: "50%" }}>
        <Text style={styles.text1}>Mục tiêu dinh dưỡng hôm nay</Text>
        <Text style={styles.text2}>2600 Kcal</Text>
        <Pressable
          onPress={() => router.push("/eating-schedule")}
          style={styles.button}
        >
          <Text style={{ color: "black", fontWeight: "500" }}>
            Chi tiết
          </Text>
        </Pressable>
      </View>
      <MaterialCommunityIcons name="nutrition"  size={112} color="#00FF66" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "90%",
    height: 162,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "grey",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    color: "#adadad",
    fontWeight: "500",
    lineHeight: 16
  },
  text2: {
    color: "#00FF66",
    fontWeight: "700",
    fontSize: 24,
    paddingTop: 5
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#90A5B433",
  },
});

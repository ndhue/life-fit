import { router } from "expo-router";
import { Image } from "react-native";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export const WaterView = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: "50%" }}>
        <Text style={styles.text1}>Lượng nước bạn cần uống hôm nay</Text>
        <Text style={styles.text2}>2000 ml</Text>
        <Pressable
          onPress={() => router.push("/water-tracker")}
          style={styles.button}
        >
          <Text style={{ color: "black", fontWeight: "500" }}>
            Chi tiết
          </Text>
        </Pressable>
      </View>
      <Image 
        style={{
          width: 120,
          height: 120
        }}
        source={require("../assets/images/process.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
    color: "#5DCCFC",
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

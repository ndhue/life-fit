import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";

interface props {
  periodLengthCurrent: {}
}

export const PeriodView = ({ periodLengthCurrent }: props) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "50%" }}>
        <Text style={styles.text1}>Chu kỳ kinh nguyệt</Text>
        { periodLengthCurrent?.lengthperiod ? (
          <>
          <Text style={styles.text2}>Ngày {periodLengthCurrent?.lengthperiod}</Text>
            <Pressable
          onPress={() => router.push("/period-tracker")}
          style={styles.button}
        >
          <Text style={{ color: "black", fontWeight: "500" }}>
            Chi tiết
          </Text>
        </Pressable>
          </>
        ) : (
          <>
          <Text style={[styles.text2, { fontSize: 16 }]}>Chưa có chu kỳ mới</Text>
            <Pressable
                onPress={() => router.push("/eating-target")}
                style={styles.button}
              >
                <Text style={{ color: "black", fontWeight: "500" }}>
                  Bắt đầu
                </Text>
              </Pressable>
          </>
        )}
      </View>
      <MaterialCommunityIcons name="flower" size={112} color="#FF1E52" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "90%",
    height: 162,
    borderRadius: 8,

    backgroundColor: 'white', 
    shadowColor: 'gray', 
    shadowOpacity: 0.5, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
    color: "#FF1E52",
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

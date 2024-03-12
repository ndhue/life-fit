import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { bg, global } from "../../constants/Global";
import { useEffect, useState } from "react";
import { formatDate } from "../../toast/formatter";
import HomeHeader from "../../components/HomeHeader";

export default function TabHomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <ScrollView>
          <HomeHeader />
          <View style={[global.container, { marginTop: 20}]}>
            <View style={[global.flexBox, { width: "90%" }]}>
              <Text style={styles.datetime}>{formatDate(currentTime)}</Text>
              <AntDesign name="sync" size={18} color="black" />
            </View>
            <View style={styles.wrapper}>
              <View style={[global.flexBox, { flexWrap: "wrap" }]}>
                {/* Heart rate */}
                <View style={[styles.box, { backgroundColor: "#D2416E33" }]}>
                  <View style={styles.detail}>
                    <AntDesign name="hearto" size={17} color="#D2416E" />
                    <Text style={styles.title}>Nhịp tim</Text>
                  </View>
                  <View
                    style={[
                      styles.detail,
                      { alignItems: "baseline", gap: 2, paddingTop: 10 },
                    ]}
                  >
                    <Text style={[styles.static, { color: "#D2416E" }]}>
                      78
                    </Text>
                    <Text style={[styles.type, { color: "#D2416E" }]}>bpm</Text>
                  </View>
                </View>

                {/* Blood Pressure */}
                <View style={[styles.box, { backgroundColor: "#7042C933" }]}>
                  <View style={styles.detail}>
                    <Ionicons name="timer-outline" size={20} color="#7042C9" />
                    <Text style={styles.title}>Huyết áp</Text>
                  </View>
                  <View
                    style={[
                      styles.detail,
                      { alignItems: "baseline", gap: 2, paddingTop: 10 },
                    ]}
                  >
                    <Text style={[styles.static, { color: "#7042C9" }]}>
                      150
                    </Text>
                    <Text style={[styles.type, { color: "#7042C9" }]}>
                      mmhg
                    </Text>
                  </View>
                </View>

                {/* Calories */}
                <View style={[styles.box, { backgroundColor: "#0DB1AD33" }]}>
                  <View style={styles.detail}>
                    <MaterialIcons
                      name="local-fire-department"
                      size={18}
                      color="#0DB1AD"
                    />
                    <Text style={styles.title}>Calo</Text>
                  </View>
                  <View
                    style={[
                      styles.detail,
                      { alignItems: "baseline", gap: 2, paddingTop: 10 },
                    ]}
                  >
                    <Text style={[styles.static, { color: "#0DB1AD" }]}>
                      608
                    </Text>
                    <Text style={[styles.type, { color: "#0DB1AD" }]}>
                      Kcal
                    </Text>
                  </View>
                </View>

                {/* Weight */}
                <View style={[styles.box, { backgroundColor: "#197BD233" }]}>
                  <View style={styles.detail}>
                    <FontAwesome5 name="weight" size={18} color="#197BD2" />
                    <Text style={styles.title}>Cân nặng</Text>
                  </View>
                  <View
                    style={[
                      styles.detail,
                      { alignItems: "baseline", gap: 2, paddingTop: 15 },
                    ]}
                  >
                    <Text style={[styles.static, { color: "#197BD2" }]}>
                      44
                    </Text>
                    <Text style={[styles.type, { color: "#197BD2" }]}>kg</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.info}>
              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Nhịp tim</Text>
                  <Text style={styles.subDetail}>Mô tả gì á hông biết</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Huyết áp</Text>
                  <Text style={styles.subDetail}>Mô tả gì á hông biết</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Calories</Text>
                  <Text style={styles.subDetail}>Mô tả gì á hông biết</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Nước</Text>
                  <Text style={styles.subDetail}>Mô tả gì á hông biết</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    backgroundColor: "white",
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    width: "47%",
    marginVertical: "3%",
  },
  datetime: {
    fontSize: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  static: {
    fontSize: 30,
    fontWeight: "600",
  },
  type: {
    fontSize: 16,
    fontWeight: "500",
  },
  info: {
    width: '90%',
    position: "relative",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
  },
  borderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d1",
    paddingVertical: 8,
  },
  subTitle: {
    color: "#adadad",
    fontWeight: "600",
  },
  subDetail: {
    fontWeight: "600",
    fontSize: 18,
  },
  conclusion: {
    color: "#6b6b6b",
    fontWeight: "700",
  },
});

import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useAppSelector } from "../../redux/store";
import { useGetBloodPressureQuery, useGetDietGoalQuery, useGetHeartQuery, useGetWeightRecordQuery } from "../../controllers/api";
import { formatDate } from "../../toast/formatter";

export default function TabHealthScreen() {
  const { token } = useAppSelector(state => state.auth);

  const [currentTime, setCurrentTime] = useState(new Date().toISOString());
  const [health, setHealth] = useState({
    heartRate: {},
    bloodPressure: {},
    diet: {},
    weight: {}
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 360000);

    return () => clearInterval(intervalId);
  }, []);

  const { data: heartRate } = useGetHeartQuery(token);
  const { data: bloodPressure } = useGetBloodPressureQuery(token);
  const { data: diet } = useGetDietGoalQuery(token);
  const { data: weight } = useGetWeightRecordQuery(token);
  
  useEffect(() => {
      if ( heartRate && bloodPressure && diet && weight ) {
        setHealth({
          heartRate: [...heartRate.result][heartRate.result.length -1 ],
          bloodPressure: [...bloodPressure.result][bloodPressure.result.length -1 ],
          weight: [...weight.result][weight.result.length -1 ],
          diet: [...diet.result][diet.result.length -1 ],
        })
      }
    
  }, [heartRate, bloodPressure, diet, weight]);

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <View style={global.wrapper}>
        <ScrollView>
          <Header title="Hồ sơ sức khỏe" route="/" />
          <View style={global.container}>
            <View style={styles.wrapper}>
              <View style={[global.flexBox, { flexWrap: "wrap" }]}>
                {/* Heart rate */}
                <View style={[styles.box, { backgroundColor: "#D2416E33" }]}>
                  <View style={styles.detail}>
                    <AntDesign name="hearto" size={17} color="#D2416E" />
                    <Text style={styles.title}>Nhịp tim</Text>
                  </View>
                  <Text style={styles.datetime}>{ health.heartRate?.date && formatDate(health.heartRate?.date)}</Text>
                  <View style={[global.flexBox, { alignItems: "flex-end" }]}>
                    { health.heartRate ? (
                      <View style={[styles.detail, { alignItems: "baseline", gap: 2}]}>
                      <Text style={[styles.static, { color: "#D2416E" }]}>
                        {health.heartRate?.heartbeat}
                      </Text>
                      <Text style={[styles.type, { color: "#D2416E" }]}>bpm</Text>
                    </View>
                    ) : (
                      <Text style={[styles.type, { color: "#D2416E", fontSize: 12  }]}>
                        Chưa có lịch sử
                      </Text>
                    )}
                    
                    <TouchableOpacity onPress={() => router.push('/heart-history')}>
                      <FontAwesome name="history" size={20} color="#D2416E" />
                    </TouchableOpacity>
                  </View>
                  {!health.bloodPressure && (
                    <Pressable onPress={() => router.push('/heart-history')} style={styles.button}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      Thêm
                    </Text>
                  </Pressable>
                  )}
                </View>

                {/* Blood Pressure */}
                <View style={[styles.box, { backgroundColor: "#7042C933" }]}>
                  <View style={styles.detail}>
                    <Ionicons name="timer-outline" size={20} color="#7042C9" />
                    <Text style={styles.title}>Huyết áp</Text>
                  </View>
                  <Text style={styles.datetime}>{health.bloodPressure?.date && formatDate(health.bloodPressure?.date)}</Text>
                  <View style={[global.flexBox, { alignItems: "flex-end" }]}>
                    { health.bloodPressure ? (
                      <View style={[styles.detail,{ alignItems: "baseline", gap: 2}]}>
                        <Text style={[styles.static, { color: "#7042C9" }]}>
                          {health.bloodPressure?.blood_pressure}
                        </Text>
                        <Text style={[styles.type, { color: "#7042C9" }]}>
                          mmhg
                        </Text>
                      </View>

                    ) : (
                      <Text style={[styles.type, { color: "#7042C9", fontSize: 12  }]}>
                        Chưa có lịch sử
                      </Text>
                    )}
                    <TouchableOpacity onPress={() => router.push('/blood-pressure-history')}>
                      <FontAwesome name="history" size={20} color="#7042C9" />
                    </TouchableOpacity>
                  </View>
                  {!health.bloodPressure && (
                    <Pressable onPress={() => router.push('/blood-pressure-history')} style={styles.button}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      Thêm
                    </Text>
                  </Pressable>
                  )}
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
                  <Text style={styles.datetime}>{ health.diet?.date && formatDate(health.diet?.date)}</Text>
                  <View style={[global.flexBox, { alignItems: "flex-end" }]}>
                    {health.diet ? (
                      <View style={[styles.detail,{ alignItems: "baseline", gap: 2 }]}>
                      <Text style={[styles.static, { color: "#0DB1AD" }]}>
                        {health.diet?.goal}
                      </Text>
                      <Text style={[styles.type, { color: "#0DB1AD"}]}>
                        Kcal
                      </Text>
                    </View>
                    ) : (
                      <>
                        <Text style={[styles.type, { color: "#0DB1AD", fontSize: 12  }]}>
                        Chưa có lịch sử
                      </Text>
                      </>
                    )}
                    <TouchableOpacity onPress={() => router.push('/calo-history')}>
                      <FontAwesome name="history" size={20} color="#0DB1AD" />
                    </TouchableOpacity>
                  </View>
                  {!health.diet && (
                    <Pressable onPress={() => router.push('/eating-schedule')} style={styles.button}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      Thêm
                    </Text>
                  </Pressable>
                  )}
                </View>

                {/* Weight */}
                <View style={[styles.box, { backgroundColor: "#197BD233" }]}>
                  <View style={styles.detail}>
                    <FontAwesome5 name="weight" size={18} color="#197BD2" />
                    <Text style={styles.title}>Cân nặng</Text>
                  </View>
                  <Text style={styles.datetime}>{health.weight?.date_recorded && formatDate(health.weight?.date_recorded)}</Text>
                  <View style={[global.flexBox, { alignItems: "flex-end" }]}>
                    { health.weight ? (
                      <View
                      style={[
                        styles.detail,
                        { alignItems: "baseline", gap: 2},
                      ]}
                    >
                      <Text style={[styles.static, { color: "#197BD2" }]}>
                        {health.weight?.weight}
                      </Text>
                      <Text style={[styles.type, { color: "#197BD2" }]}>kg</Text>
                    </View>
                    ) : (
                      <Text style={[styles.type, { color: "#197BD2", fontSize: 12  }]}>
                        Chưa có lịch sử
                      </Text>
                    )}
                    <TouchableOpacity onPress={() => router.push('/weight-history')}>
                      <FontAwesome name="history" size={20} color="#197BD2" />
                    </TouchableOpacity>
                  </View>
                  {!health.weight && (
                    <Pressable onPress={() => router.push('/weight-history')} style={styles.button}>
                    <Text style={{ color: "black", fontWeight: "500" }}>
                      Thêm
                    </Text>
                  </Pressable>
                  )}
                </View>
              </View>
            </View>

            <View style={styles.info}>
              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Nhịp tim</Text>
                  <Text style={styles.subDetail}>{health.heartRate?.date ? formatDate(health.heartRate?.date) : "Chưa có lịch sử"}</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Huyết áp</Text>
                  <Text style={styles.subDetail}>{health.bloodPressure?.date ? formatDate(health.bloodPressure?.date) : "Chưa có lịch sử"}</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Calories</Text>
                  <Text style={styles.subDetail}>{ health.diet?.date ? formatDate(health.diet?.date) : "Chưa có lịch sử"}</Text>
                </View>
                <View>
                  <Text style={styles.conclusion}>Bình thường</Text>
                </View>
              </View>

              <View style={[styles.borderInfo, global.flexBox]}>
                <View>
                  <Text style={styles.subTitle}>Cân nặng</Text>
                  <Text style={styles.subDetail}>{health.weight?.date_recorded ? formatDate(health.weight?.date_recorded) : "Chưa có lịch sử"}</Text>
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
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // This is for Android
    padding: 20,
    backgroundColor: 'white', 
    shadowColor: 'gray', 
    shadowOpacity: 0.5, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  box: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 15,
    width: "47%",
    height: 110,
    marginVertical: "3%",
    padding: 20,
  },
  datetime: {
    color: "#6b6b6b",
    fontSize: 12,
    fontWeight: "600",
    paddingTop: 2
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
    fontSize: 26,
    fontWeight: "600",
  },
  type: {
    fontSize: 15,
    fontWeight: "500",
  },
  info: {
    width: "90%",
    position: "relative",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    backgroundColor: 'white', 
    shadowColor: 'gray', 
    shadowOpacity: 0.5, 
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
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
  button: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#fcfcfc",
    marginTop: 8
  },
});

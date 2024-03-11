import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bg, global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import Header from "../../components/Header";
import LargeButton from "../../components/LargeButton";
import { useSetWaterGoalMutation } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import { showToastErrorSetGoal, showToastSuccessSetGoal } from "../../toast/toaster";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";

const EditWaterTracker = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [watergoal, setSelectedOption] = useState(0);
  const [goal, setGoal] = useState(0);
  const [target, setTarget] = useState(0);
  const [isLoading, setIsloading] = useState(false);

  const handleChangeTarget = (target: number) => {
    setTarget(target);
    setGoal(target);
    setSelectedOption(target*200);
  }

  const [setWaterGoal] = useSetWaterGoalMutation();

  const handleSubmit = async () => {
    const dategoal = new Date();
    const data = { watergoal, dategoal };
    setIsloading(true);
    try {
      const result = await setWaterGoal({data, token});
      console.log("water goal successful:", result);
      if (result?.data) {
        setIsloading(false);
        showToastSuccessSetGoal();
        setTimeout(() => {
          router.replace("/activity/water-tracker");
        }, 1000);
      } else {
        setIsloading(false);
        showToastErrorSetGoal();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorSetGoal();
    }
  }
  
  return (
    <>
      <ImageBackground
        source={bg}
        style={global.backgroundImage}
        resizeMode="cover"
      >
        <View style={global.wrapper}>
          <Header
            title="Mục tiêu của tôi"
            main={true}
            route="/activity/water-tracker"
          />
          <View style={global.container}>
            <View style={styles.water}>
              <Text style={styles.number}>{goal}</Text>
            </View>
            <View style={styles.pickerOverlay}>
              <Picker
                selectedValue={watergoal}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedOption(itemValue);
                  setGoal(Number(itemValue) / 200);
                }}
                style={styles.picker}
              >
                <Picker.Item
                  label="4 ly (800ml)"
                  value="800"
                />
                <Picker.Item
                  label="6 ly (1200ml)"
                  value="1200"
                />
                <Picker.Item
                  label="8 ly (1600ml)"
                  value="1600"
                />
                <Picker.Item
                  label="10 ly (2000ml)"
                  value="2000"
                />
                <Picker.Item
                  label="12 ly (2400ml)"
                  value="2400"
                />
              </Picker>
            </View>

            <View style={{ paddingVertical: 20 }}>
              <LargeButton
                loading={isLoading}
                variant="secondary"
                title="Hoàn tất"
                onPress={handleSubmit}
              />
            </View>
          </View>
          <View style={styles.fixedContainer}>
            <View
              style={{
                height: 5,
                width: 60,
                backgroundColor: Colors.primary,
                position: "absolute",
                left: Dimensions.get("window").width / 2 - 25,
                top: 10,
              }}
            />
            <View
              style={{
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Mục tiêu uống nước
              </Text>
              <Text
                style={{
                  color: "#90A5B4",
                  textAlign: "center",
                  paddingTop: 8,
                }}
              >
                Chúng tôi đã chuẩn bị một số mục tiêu cho bạn!
              </Text>
              <View style={styles.options}>
                <View style={[styles.option, { borderColor: `${target === 10 ? Colors.border : "#D0DBE2"}` }]}>
                  <TouchableOpacity onPress={() => handleChangeTarget(10)}>
                  <View style={{ padding: 15 }}>
                    <Text style={styles.optionTitle}>Ngày nóng</Text>
                    <View style={global.flexBox}>
                      <Text style={styles.optionTarget}>10 Ly</Text>
                      <Image
                        source={require("../../assets/images/coconut.png")}
                      />
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.option, { borderColor: `${target === 7 ? Colors.border : "#D0DBE2"}` }]}>
                  <TouchableOpacity onPress={() => handleChangeTarget(7)}>
                    <View style={{ padding: 15 }}>
                      <Text style={styles.optionTitle}>Thể thao</Text>
                      <View style={global.flexBox}>
                        <Text style={styles.optionTarget}>7 Ly</Text>
                        <Image
                          source={require("../../assets/images/basketball.png")}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.option, { borderColor: `${target === 5 ? Colors.border : "#D0DBE2"}` }]}>
                  <TouchableOpacity onPress={() => handleChangeTarget(5)}>
                    <View style={{ padding: 15 }}>
                      <Text style={styles.optionTitle}>Ngày lạnh</Text>
                      <View style={global.flexBox}>
                        <Text style={styles.optionTarget}>5 Ly</Text>
                        <Image source={require("../../assets/images/cold.png")} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.option, { borderColor: `${target === 4 ? Colors.border : "#D0DBE2"}` }]}>
                  <TouchableOpacity onPress={() => handleChangeTarget(4)}>
                  <View style={{ padding: 15 }}>
                    <Text style={styles.optionTitle}>Trẻ em</Text>
                    <View style={global.flexBox}>
                      <Text style={styles.optionTarget}>4 Ly</Text>
                      <Image
                        source={require("../../assets/images/rainbow.png")}
                      />
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  pickerOverlay: {
    marginVertical: 10,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: 'white',
    height: 75,
    overflow: 'hidden'
  },
  picker: {
    width: 260,
    fontSize: 18,
    top: '-92%'
  },
  water: {
    backgroundColor: Colors.primary,
    borderRightColor: "black",
    borderRightWidth: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    height: 120,
    marginVertical: 30,
  },
  number: {
    color: "white",
    fontWeight: "700",
    fontSize: 80,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  fixedContainer: {
    position: "fixed",
    height: 350,
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
  },
  options: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 25,
    paddingTop: 10,
  },
  option: {
    borderColor: "#D0DBE2",
    borderWidth: 1,
    borderRadius: 8,
    width: "45%",
    height: 92,
    marginTop: 15,
  },
  optionTitle: {
    color: "#90A5B4",
    fontSize: 14,
    paddingBottom: 10,
  },
  optionTarget: {
    fontSize: 22,
    fontWeight: "600",
  },
});
export default EditWaterTracker;

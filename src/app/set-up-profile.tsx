import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import * as yup from "yup";
import RangeSlider from "rn-range-slider";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bg, global } from "../constants/Global";
import LargeButton from "../components/LargeButton";
import { useSetUpProfileMutation } from "../controllers/api";
import { UserProfile } from "../types/user";
import { router } from "expo-router";
import Colors from "../constants/Colors";

const SetUpProfile = () => {
  const schema = yup.object().shape({
    gender: yup.string().required("Hãy chọn giới tính của bạn"),
    age: yup.number().required("Hãy chọn tuổi của bạn"),
    weight: yup.number().required("Hãy chọn cân nặng của bạn"),
    height: yup.number().required("Hãy chọn chiều cao của bạn"),
    wakeup_time: yup.string().required("Hãy nhập giờ dậy của bạn"),
    sleeping_time: yup.string().required("Hãy nhập giờ ngủ của bạn"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "",
      age: 0,
      weight: 0,
      height: 0,
      wakeup_time: new Date(),
      sleeping_time: new Date(),
    },
  });

  const [select, setSelect] = useState('');

  const [setUpProfile] = useSetUpProfileMutation();

  const onSubmit = async (data: UserProfile) => {
    try {
      const result = await setUpProfile(data);
      console.log("setUpProfile successful:", result);
      router.push("/set-up-profile");
    } catch (error) {
      console.error("setUpProfile failed:", error);
    }
  };

  const handleSelectGender = (gender: string) => {
    setValue('gender', gender);
    setSelect(gender);
  }

  const handleValueChange = useCallback((low, high, val) => {
    setValue(val, low);
  }, []);

  const handleWakeupTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    setValue("wakeup_time", selectedTime);
  };

  const handleSleepingTimeChange = (
    event: DateTimePickerEvent,
    selectedTime?: Date
  ) => {
    setValue("sleeping_time", selectedTime);
  };

  return (
    <ImageBackground
      source={bg}
      style={global.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" || Platform.OS === "android"
            ? "padding"
            : "height"
        }
        style={{ flex: 1 }}
      >
        <View style={global.wrapper}>
          <View
            style={[
              global.flexBox,
              {
                paddingTop: 50,
                paddingBottom: 20,
                justifyContent: "center",
              },
            ]}
          >
            <Text style={global.title}>Tổng quan về bạn</Text>
          </View>
          <View style={global.container}>
            {/* Gender */}
            <View style={styles.choose}>
              <View>
                <Text style={styles.label}>Giới tính của bạn</Text>
                <View style={[global.flexBox, { gap: 15 }]}>
                  <TouchableOpacity onPress={() => handleSelectGender('male')}>
                    <View style={styles.gender}>
                      <Image
                        source={require("../assets/images/male-svg-com.png")}
                      />
                      {select === "male" && (
                        <View style={styles.check}>
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#009418"
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleSelectGender('female')}
                  >
                    <View style={styles.gender}>
                      <Image
                        source={require("../assets/images/female-svg-com.png")}
                      />
                      {select === "female" && (
                        <View style={styles.check}>
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#009418"
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleSelectGender('other')}>
                    <View style={styles.gender}>
                      <Image
                        source={require("../assets/images/gender-svg-com.png")}
                      />
                      {select === "other" && (
                        <View style={styles.check}>
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#009418"
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {errors.gender && (
                <Text style={global.error}>{errors.gender.message}</Text>
              )}
            </View>

            {/* Age */}
            <View style={styles.choose}>
              <View>
                <Text style={styles.label}>Tuổi</Text>
                <RangeSlider
                  style={{ width: 350 }}
                  gravity={"center"}
                  min={0}
                  max={100}
                  step={1}
                  rangeEnabled={false} // Disable range selection
                  selectionColor="#FF1E52"
                  blankColor="#2d4150"
                  onValueChanged={(low, high) =>
                    handleValueChange(low, high, "age")
                  }
                  renderThumb={(index) => (
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 26,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",

                        opacity: index === "low" ? 1 : 0,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: 12,
                        }}
                      >
                        {getValues("age")}
                      </Text>
                    </View>
                  )}
                  renderRail={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.border,
                      }}
                    />
                  )}
                  renderRailSelected={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.primary,
                      }}
                    />
                  )}
                />
                <View style={[global.flexBox, { paddingHorizontal: 10 }]}>
                  <Text style={styles.genderLabel}>0</Text>
                  <Text style={styles.genderLabel}>100</Text>
                </View>
              </View>
              {errors.age && (
                <Text style={global.error}>{errors.age.message}</Text>
              )}
            </View>

            {/* Weight */}
            <View style={styles.choose}>
              <View>
                <Text style={styles.label}>
                  Cân nặng
                  <Text style={styles.subLabel}>(kg)</Text>
                </Text>
                <RangeSlider
                  style={{ width: 350 }}
                  gravity={"center"}
                  min={0}
                  max={200}
                  step={1}
                  rangeEnabled={false}
                  onValueChanged={(low, high) =>
                    handleValueChange(low, high, "weight")
                  }
                  renderThumb={(index) => (
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 26,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",

                        opacity: index === "low" ? 1 : 0,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: 12,
                        }}
                      >
                        {getValues("weight")}
                      </Text>
                    </View>
                  )}
                  renderRail={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.border,
                      }}
                    />
                  )}
                  renderRailSelected={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.primary,
                      }}
                    />
                  )}
                />
                <View style={[global.flexBox, { paddingHorizontal: 10 }]}>
                  <Text style={styles.genderLabel}>0</Text>
                  <Text style={styles.genderLabel}>200</Text>
                </View>
              </View>
              {errors.weight && (
                <Text style={global.error}>{errors.weight.message}</Text>
              )}
            </View>

            {/* Height */}
            <View style={styles.choose}>
              <View>
                <Text style={styles.label}>
                  Chiều cao
                  <Text style={styles.subLabel}>(cm)</Text>
                </Text>
                <RangeSlider
                  style={{ width: 350 }}
                  gravity={"center"}
                  min={0}
                  max={200}
                  step={1}
                  rangeEnabled={false} // Disable range selection
                  onValueChanged={(low, high) =>
                    handleValueChange(low, high, "height")
                  }
                  renderThumb={(index) => (
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 26,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",

                        opacity: index === "low" ? 1 : 0,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "600",
                          fontSize: 12,
                        }}
                      >
                        {getValues("height")}
                      </Text>
                    </View>
                  )}
                  renderRail={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.border,
                      }}
                    />
                  )}
                  renderRailSelected={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 2.5,
                        backgroundColor: Colors.primary,
                      }}
                    />
                  )}
                />
                <View style={[global.flexBox, { paddingHorizontal: 10 }]}>
                  <Text style={styles.genderLabel}>0</Text>
                  <Text style={styles.genderLabel}>200</Text>
                </View>
              </View>
              {errors.height && (
                <Text style={global.error}>{errors.height.message}</Text>
              )}
            </View>

            {/* Wake up time */}
            <View style={styles.choose}>
              <View>
                <Text style={[styles.label, { paddingBottom: 50 }]}>
                  Giờ dậy
                </Text>
                <DateTimePicker
                  value={getValues("wakeup_time")}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleWakeupTimeChange}
                  style={{
                    position: "absolute",
                    left: -10,
                    top: 28,
                  }}
                />
              </View>
              {errors.wakeup_time && (
                <Text style={global.error}>{errors.wakeup_time.message}</Text>
              )}
            </View>

            {/* Sleeping time */}
            <View style={styles.choose}>
              <View>
                <Text style={[styles.label, { paddingBottom: 50 }]}>
                  Giờ ngủ
                </Text>
                <DateTimePicker
                  value={getValues("sleeping_time")}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={handleSleepingTimeChange}
                  style={{
                    position: "absolute",
                    left: -10,
                    top: 28,
                  }}
                />
              </View>
              {errors.sleeping_time && (
                <Text style={global.error}>{errors.sleeping_time.message}</Text>
              )}
            </View>

            <View style={{ paddingTop: 10 }}>
              <LargeButton
                variant="secondary"
                title="Hoàn tất"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  choose: {
    paddingVertical: 10,
    width: 350,
  },
  label: {
    fontWeight: "600",
    textAlign: "left",
    fontSize: 15,
    paddingBottom: 5,
  },
  subLabel: {
    fontWeight: "500",
    fontSize: 12,
    marginLeft: 8,
  },
  gender: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  check: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  genderLabel: {
    fontSize: 12,
  },
});

export default SetUpProfile;

import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { bg, global } from "../constants/Global";
import Header from "../components/Header";
import { useAppSelector } from "../redux/store";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LargeButton from "../components/LargeButton";
import { useUpdateProfileMutation } from "../controllers/api";
import { router } from "expo-router";
import { showToastErrorEditProfile, showToastSuccessEditProfile } from "../toast/toaster";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import { toastConfig } from "../toast/config/toastConfig";
import { formatDate } from "../toast/formatter";

export default function EditProfile() {
  const { token, profile } = useAppSelector((state) => state.auth);

  const [dateValue, setDateValue] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [select, setSelect] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate: Date) => {
    if (type == 'set') {
      setDate(selectedDate);
    } else {
      toggleDatePicker();
    }
  }

  const confirmDate = () => {
    const formattedDate = formatDate(date);
    setDateValue(formattedDate);
    setValue('birthday', formattedDate);
    toggleDatePicker();
  }

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    fullname: yup.string().required("Họ tên không được để trống"),
    birthday: yup.string().required("Ngày sinh không được để trống"),
    gender: yup.string().required("Hãy chọn giới tính của bạn"),
    weight: yup.number().required("Hãy chọn cân nặng của bạn"),
    height: yup.number().required("Hãy chọn chiều cao của bạn"),
    wakeup_time: yup.date().required("Hãy nhập giờ dậy của bạn"),
    sleeping_time: yup.date().required("Hãy nhập giờ ngủ của bạn"),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: profile.email,
      fullname: profile.fullname,
      birthday: profile.birthday,
      gender: profile.gender,
      weight: profile.weight,
      height: profile.height,
      wakeup_time: new Date(profile.wakeup_time),
      sleeping_time: new Date(profile.sleeping_time),
    },
  });


  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const result = await updateProfile({data, token});
      
      if (result?.data) {
        setIsloading(false);
        showToastSuccessEditProfile();
        setTimeout(() => {
          router.replace("/profile");
        }, 1000);
      } else {
        setIsloading(false);
        showToastErrorEditProfile();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorEditProfile();
    }
  };

  const handleSelectGender = (gender: string) => {
    setValue('gender', gender);
    setSelect(gender);
  };

  return (
    <>
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
            <Header title="Hồ sơ của tôi" edit={true} route="/profile" main={true} />
            <ScrollView>
            <View style={global.container}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: "gray",
                  borderRadius: 100,
                }}
              ></View>
              <View style={{ marginBottom: 20, width: 339 }}>
                <InputField
                  label="Email"
                  onChangeText={(t) => setValue('email', t)}
                  defaultValue={profile.email}
                />
                <InputField
                  label="Họ và tên"
                  onChangeText={(t) => setValue('fullname', t)}
                  defaultValue={profile.fullname}
                />
                {/* Birthday */}
                <InputField
                  label='Ngày sinh'
                  placeholder='YYYY/MM/DD'
                  onPress={toggleDatePicker}
                  editable={false}   
                  value={dateValue}
                  onChangeText={t => setValue('birthday', t)}
                />
                {errors.birthday && <Text style={global.error}>{errors.birthday.message}</Text>}
                {showPicker && <View
                  style={{
                    height: 350,
                    top: 100,
                    bottom: 0,
                    margin: 'auto',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                    zIndex: 99,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <DateTimePicker 
                    style={{
                      height: 250
                    }}
                    display="spinner" 
                    value={date} 
                    mode="date" 
                    onChange={onChange} 
                  />
                  <View style={{
                    paddingHorizontal: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10
                  }}>
                    <Button title="Hủy" onPress={toggleDatePicker}/>
                    <Button title="Xong" onPress={confirmDate} />
                  </View>
                </View>}
                {/* Gender */}
                <View style={styles.choose}>
                  <View>
                    <Text style={styles.label}>Giới tính của bạn</Text>
                    <View style={[global.flexBox, { gap: 15 }]}>
                      <TouchableOpacity
                        onPress={() => handleSelectGender("male")}
                      >
                        <View style={styles.gender}>
                          <Image
                            source={require("../assets/images/male-svg-com.png")}
                          />
                          {(select === "male" ||
                            profile.gender === "male") && (
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
                        onPress={() => handleSelectGender("female")}
                      >
                        <View style={styles.gender}>
                          <Image
                            source={require("../assets/images/female-svg-com.png")}
                          />
                          {(select === "female" ||
                            profile.gender === "female") && (
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
                        onPress={() => handleSelectGender("other")}
                      >
                        <View style={styles.gender}>
                          <Image
                            source={require("../assets/images/gender-svg-com.png")}
                          />
                          {(select === "other" ||
                            profile.gender === "other") && (
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

                <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "48%" }}>
                <InputField
                  label="Cân nặng"
                  subLabel="(kg)"
                  defaultValue={profile.weight.toString()}
                  onChangeText={t => setValue('weight', Number(t))}
                />
              </View>
              <View style={{ marginLeft: "4%", width: "48%" }}>
                <InputField
                  label="Chiều cao"
                  subLabel="(cm)"
                  defaultValue={profile.height.toString()}
                  onChangeText={t => setValue('height', Number(t))}
                />
              </View>
            </View>

                {/* Wake up time */}
                <View style={styles.choose}>
                  <View>
                    <Text style={[styles.label, { paddingBottom: 50 }]}>
                      Giờ dậy
                    </Text>
                    <DateTimePicker
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={t => setValue('wakeup_time', t)}
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
                      value={new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={t => setValue('sleeping_time', t)}
                      style={{
                        position: "absolute",
                        left: -10,
                        top: 28,
                      }}
                    />
                  </View>
                  {errors.sleeping_time && (
                    <Text style={global.error}>
                      {errors.sleeping_time.message}
                    </Text>
                  )}
                </View>

                <View style={{ paddingTop: 10 }}>
                  <LargeButton
                    loading={isLoading}
                    variant="secondary"
                    title="Hoàn tất"
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
              </View>
            </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <Toast config={toastConfig} />
    </>
  );
}
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

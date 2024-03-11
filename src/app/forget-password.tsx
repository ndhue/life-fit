import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { bg, global } from "../constants/Global";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import { useSendOtpMutation } from "../controllers/api";
import { router } from "expo-router";
import { StyleSheet } from "react-native";
import LargeButton from "../components/LargeButton";
import { useDispatch } from "react-redux";
import { doSaveEmail } from "../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import { toastConfig } from "../toast/config/toastConfig";
import {
  showToastErrorSendOtp,
  showToastSuccessSendOtp,
} from "../toast/toaster";

const ForgetPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [sendOtp] = useSendOtpMutation();

  const onSubmit = async (data: { email: string }) => {
    setIsloading(true);
    dispatch(doSaveEmail(data));
    try {
      const result = await sendOtp(data);
      if (result?.data) {
        setIsloading(false);
        showToastSuccessSendOtp();
        setTimeout(() => {
          router.push("/confirm");
        }, 2000);
      } else {
        setIsloading(false);
        showToastErrorSendOtp();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorSendOtp();
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios" || Platform.OS === "android"
            ? "padding"
            : "height"
        }
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={bg}
          style={global.backgroundImage}
          resizeMode="cover"
        >
          <View style={global.wrapper}>
            <View style={global.container}>
              <View style={styles.fixedContainer}>
                <View style={{ marginHorizontal: 30, marginVertical: 100 }}>
                  <InputField
                    label="EMAIL"
                    placeholder="Tài khoản email của bạn"
                    onChangeText={(text) => setValue("email", text)}
                  />
                  {errors.email && (
                    <Text style={global.error}>{errors.email.message}</Text>
                  )}
                  <View style={{ marginTop: 30 }}>
                    <LargeButton
                      loading={isLoading}
                      title="Gửi"
                      variant="primary"
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      <Toast config={toastConfig} />
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.primary,
    borderRightColor: "black",
    borderRightWidth: 3,
    display: "flex",
    alignItems: "center",
  },
  fixedContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 40,
    bottom: 0,
  },
  input: {
    borderRadius: 3,
    border: `2px solid ${Colors.border}`,
    backgroundColor: Colors.background2,
    paddingHorizontal: 15,
  },
});

export default ForgetPassword;

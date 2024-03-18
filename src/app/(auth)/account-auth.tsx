import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { bg, global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import { useAccountAuthenMutation } from "../../controllers/api";
import { useAppSelector } from "../../redux/store";
import LargeButton from "../../components/LargeButton";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../toast/config/toastConfig";
import { showToastErrorAuth, showToastSuccessAuth } from "../../toast/toaster";

const AccountAuthent = () => {
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  const email = useAppSelector((state) => state.auth.email);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } 
      if (seconds === 0) {
        clearInterval(timer);
        setDisabled(false);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, [seconds]);

  const schema = yup.object().shape({
    otp: yup.string().required("OTP không được để trống"),
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: "",
    },
  });
  
  const [accountAuthen] = useAccountAuthenMutation();

  const onSubmit = async () => {
    try {
      setSeconds(60);
      setDisabled(false);
      const result = await accountAuthen({ email });
      console.log("Send otp successful:", result);
    } catch (error) {
      console.error("Send otp failed:", error);
    }
  };

  const onSubmitAuth = async (data: { otp: string }) => {
    setIsloading(true);
    try {
      setSeconds(60);
      setDisabled(false);
      const result = await accountAuthen(data);
      if (result?.data) {
        showToastSuccessAuth();
        setIsloading(false);
        setTimeout(() => {
          router.push('/signin');
        }, 1000);
      } else {
        setIsloading(false);
        showToastErrorAuth();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorAuth();
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
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Nhập code
                  </Text>
                  <View style={[global.flexBox, { paddingVertical: 20 }]}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(t) => setValue("otp", t)}
                    />
                  </View>
                  <View style={[global.flexBox, { justifyContent: "flex-end" }]}>
                    {errors.otp && (
                      <Text style={global.error}>{errors.otp.message}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      paddingVertical: 20
                    }}
                  >
                    <Text style={{
                      color: "#72a5b6",
                      fontSize: 32,
                      fontWeight: '500',
                      textAlign: 'center',
                      paddingBottom: 30,
                    }}>{seconds}s</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent:'center', gap: 10 }}>
                      <Text style={{ color: "#90A5B4", fontSize: 16 }}>Không nhận được OTP?</Text>
                      <Text
                        style={{ fontSize: 16, fontWeight: '600' }}
                        onPress={handleSubmit(onSubmit)}
                        disabled={seconds === 0}
                      >
                        Gửi lại mã
                      </Text>
                    </View>
                  <View style={{ marginTop: 30 }}>
                    <LargeButton
                      loading={isLoading}
                      disabled={!disabled || getValues("otp").length < 6}
                      title="XÁC NHẬN"
                      variant="primary"
                      onPress={handleSubmit(onSubmitAuth)}
                    />
                  </View>
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
    position: "fixed",
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 40,
    bottom: 0,
  },
  input: {
    borderRadius: 8,
    borderColor: Colors.border,
    borderWidth: 2,
    backgroundColor: Colors.background2,
    width: "100%",
    paddingVertical: 10,
  },
});
export default AccountAuthent;

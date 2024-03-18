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
import { useForm } from "react-hook-form";
import { bg, global } from "../constants/Global";
import Colors from "../constants/Colors";
import { useAuthOtpMutation, useSendOtpMutation } from "../controllers/api";
import { useAppSelector } from "../redux/store";
import LargeButton from "../components/LargeButton";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { toastConfig } from "../toast/config/toastConfig";
import { showToastErrorAuth, showToastErrorSendOtp, showToastSuccessAuth, showToastSuccessSendOtp } from "../toast/toaster";

const Confirm = () => {
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [otp, setOtp] = useState("");

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

  const {
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const [authOtp] = useAuthOtpMutation();
  const [sendOtp] = useSendOtpMutation();

  const onSubmit = async () => {
    try {
      const result = await sendOtp({ email });
      if (result?.data) {
        setSeconds(60);
        setDisabled(false);
        showToastSuccessSendOtp();
      } else {
      showToastErrorSendOtp();
    }
  } catch (error) {
    setIsloading(false);
    showToastErrorSendOtp();
  }
  };

  const onSubmitAuth = async (data: { otp: string }) => {
    setIsloading(true);
    try {
      const result = await authOtp(data);
      if(result?.data) {
        setSeconds(60);
        setDisabled(false);
        setIsloading(false);
        showToastSuccessAuth();
        setTimeout(() => {
          router.push('/new-password');
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
                      onChangeText={(t) => {
                        setValue("otp", t);
                        setOtp(t);
                      }}
                    />
                  </View>
                  <View style={[global.flexBox, { justifyContent: "flex-end" }]}>

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
                        disabled={seconds !== 0}
                      >
                        Gửi lại mã
                      </Text>
                    </View>
                  <View style={{ marginTop: 30 }}>
                    <LargeButton
                      loading={isLoading}
                      disabled={!(otp.length === 6)}
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
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderStartStartRadius: 40,
    bottom: 0,
  },
  input: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background2,
    width: "100%",
    paddingVertical: 10,
  },
});
export default Confirm;

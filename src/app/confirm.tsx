import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { global } from "../constants/Global";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import { useAuthOtpMutation, useSendOtpMutation } from "../controllers/api";
import { useAppSelector } from "../redux/store";
import LargeButton from "../components/LargeButton";

const Confirm = () => {
  const [seconds, setSeconds] = useState(60);
  const [disabled, setDisabled] = useState(true);

  const email = useAppSelector(state => state.auth.email);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(timer);
        setDisabled(false);
      }
    }, 1000);
  }, [seconds]);

  const schema = yup.object().shape({
    otp: yup.string().required('OTP không được để trống'),
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
    }
  });
  
  const [authOtp] = useAuthOtpMutation();
  const [sendOtp] = useSendOtpMutation();

  const onSubmit = async () => {
    try {
      setSeconds(60);
      setDisabled(false);
      const result = await sendOtp({ email });
      console.log('Send otp successful:', result);
    } catch (error) {
      console.error('Send otp failed:', error);
    }
  }; 

  const onSubmitAuth = async (data: { otp: string }) => {
    try {
      setSeconds(60);
      setDisabled(false);
      const result = await authOtp(data);
      console.log('Auth otp successful:', result);
    } catch (error) {
      console.error('Auth otp failed:', error);
    }
  }; 

  return (
    <View style={global.wrapper}>
      <View style={global.container}>
        <View style={styles.fixedContainer}>
          <View style={{ margin: 30 }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              Nhập code
            </Text>
            <View style={[global.flexBox, { paddingVertical: 20 }]}>
              <TextInput style={styles.input} onChangeText={(t) => setValue('otp', t)} />
            </View>
            <View style={[global.flexBox, { justifyContent: "flex-end"}]}>
              {errors.otp && <Text style={global.error}>{errors.otp.message}</Text>}
            </View>
            <View style={[global.container, { paddingVertical: 10, justifyContent: 'center' }]}>
              <Text style={{
                  color: "#72a5b6",
                  paddingRight: 12,
                  fontSize: 15
                }}>{seconds}s</Text>
            </View>
            <View style={[global.container, { paddingVertical: 10, justifyContent: 'center' }]}>
              <Text style={{ color: '#90A5B4' }}>Không nhận được OTP?</Text>
              <Text style={{ fontSize: 20 }} onPress={handleSubmit(onSubmit)}>Gửi lại mã</Text>
            </View>
            <LargeButton 
              disabled={!disabled || getValues("otp").length < 6}
              title="XÁC NHẬN" 
              variant="primary" 
              onPress={handleSubmit(onSubmitAuth)} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.primary,
    borderRightColor: 'black',
    borderRightWidth: 3,
    display: 'flex',
    alignItems: 'center',
  },
  fixedContainer: {
    position: 'fixed',
    height: 552,
    width: '100%',
    backgroundColor: 'white',
    borderStartStartRadius: 40,
    bottom: 0
  },
  input: {
    borderRadius: 3,
    border: `2px solid ${Colors.border}`,
    backgroundColor: Colors.background2,
    paddingHorizontal: 15
  },
});
export default Confirm;

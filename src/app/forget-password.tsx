import React from "react";
import { View, Text } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { global } from "../constants/Global";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useSendOtpMutation } from "../controllers/api";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { doSaveEmail } from "../redux/slices/authSlice";
import { StyleSheet } from "react-native";
import LargeButton from "../components/LargeButton";

const ForgetPassword = () => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  });

  const { 
    handleSubmit, 
    setValue,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    }
  });

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const onSubmit = async (data: { email: string }) => {
    try {
      const result = await sendOtp(data);
      dispatch(doSaveEmail(data.email));
      
      console.log('Send otp successful:', result);
      
      router.push('/confirm');
    } catch (error) {
      console.error('Send otp failed:', error);
    }
  }; 


  return (
    <View style={global.wrapper}>
      <View style={global.container}>
        <View style={styles.fixedContainer}>
          <InputField label="EMAIL" placeholder="Tài khoản email của bạn" onChangeText={text => setValue('email', text)} />
          {errors.email && <Text style={global.error}>{errors.email.message}</Text>}
          <View>
          <LargeButton 
            title="Gửi" 
            variant="primary" 
            onPress={handleSubmit(onSubmit)}
            />
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

export default ForgetPassword;

import React, { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Text, View, StyleSheet } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import LargeButton from "../../components/LargeButton";
import { bg, global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import InputField from "../../components/InputField";
import { useChangePasswordMutation, useUpdatePasswordMutation } from "../../controllers/api";
import { toastConfig } from "../../toast/config/toastConfig";
import { showToastErrorNewPassWord, showToastSuccessNewPassWord } from "../../toast/toaster";

const ChangePassword = () => {
  const [isLoading, setIsloading] = useState(false);

  const schema = yup.object().shape({
    oldpassword: yup.string().min(6, 'Mật khẩu cần có ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
    password: yup.string().min(6, 'Mật khẩu cần có ít nhất 6 kí tự').required('Mật khẩu không được để trống'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), ''], 'Mật khẩu không khớp').required('Mật khẩu không được để trống'),
  });

  const { 
    handleSubmit, 
    setValue,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldpassword: "",
      password: "",
      confirmpassword: ""
    }
  });

  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    setIsloading(true);
    try {
      const result = await changePassword(data);
      if (result?.data) {
        showToastSuccessNewPassWord();
        setIsloading(false);
        setTimeout(() => {
          router.replace("/signin");
        }, 1000);
      }else {
        setIsloading(false);
        showToastErrorNewPassWord();
      }
    } catch (error) {
      setIsloading(false);
      showToastErrorNewPassWord();
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
        resizeMode='cover'
      >
        <View style={global.wrapper}>
          <View style={global.container}>
          <View style={styles.fixedContainer}>
          <View style={{ marginHorizontal: 30, marginVertical: 100 }}>
            <InputField label="Mật khẩu cũ" onChangeText={(t) => setValue('oldpassword', t)} />
            {errors.oldpassword && <Text style={global.error}>{errors.oldpassword.message}</Text>}

            <InputField label="Mật khẩu mới" onChangeText={(t) => setValue('password', t)} />
            {errors.password && <Text style={global.error}>{errors.password.message}</Text>}
            
            <InputField label="Xác nhận mật khẩu" onChangeText={(t) => setValue('confirmpassword', t)} />
            {errors.confirmpassword && <Text style={global.error}>{errors.confirmpassword.message}</Text>}
            <View style={{ marginTop: 30 }}>
              <LargeButton loading={isLoading} title="Gửi" variant="primary" onPress={handleSubmit(onSubmit)} />
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
    borderRightColor: 'black',
    borderRightWidth: 3,
    display: 'flex',
    alignItems: 'center',
  },
  fixedContainer: {
    position: 'absolute',
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

export default ChangePassword;

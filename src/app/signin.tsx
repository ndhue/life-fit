import React, { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { global } from "../constants/Global";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import { useAuthLoginMutation } from "../controllers/api";
import { UserLogin } from "../types/user";
import { doSaveUser } from "../redux/slices/authSlice";
import { useAppDispatch } from "../redux/store";
import Toast from "react-native-toast-message";
import { save } from "../controllers/secureStore";

const SignIn = () => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sign in successfully',
      text2: 'This is some something 👋'
    });
  }
  const dispatch = useAppDispatch();
  const [isLoading, setIsloading] = useState(false);
  
  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const { 
    handleSubmit, 
    setValue,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const [authLogin] = useAuthLoginMutation();

  const onSubmit = async (data: UserLogin) => {
    setIsloading(true);
    try {
      const result = await authLogin(data);
      const { token } = result?.data;
      if (token) {
        setIsloading(false);
        showToast();
        dispatch(doSaveUser({ token }));
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
          save(token);
        }
        router.push('/');
      }
    } catch (error) {
      setIsloading(false);
      console.error('SignIn failed:', error);
    }
  }; 

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' || Platform.OS === 'android' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    >
      <View style={[global.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
        <View
          style={{
            width: 393,
            height: 440,
            borderRadius: 20,
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: Colors.primary,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 42,
              fontWeight: "700",
            }}
          >
            LifeFit
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Đăng nhập
          </Text>
          <View style={{ padding: 20}}>
            <InputField 
              label="EMAIL" 
              placeholder="Tài khoản email của bạn"
              onChangeText={text => setValue('email', text)}
            />
            {errors.email && <Text style={global.error}>{errors.email.message}</Text>}

            <InputField 
              secure={true}
              label="MẬT KHẨU"
              placeholder="Mật khẩu của bạn"
              onChangeText={text => setValue('password', text)}  
            />
            {errors.password && <Text style={global.error}>{errors.password.message}</Text>}
            <Text style={{ color:'grey' }} onPress={() => router.push('/forget-password')}>Quên mật khẩu?</Text>
          </View>
          <View style={{ paddingHorizontal: 70, paddingVertical: 8 }}>
            <LargeButton 
              loading={isLoading}
              title="ĐĂNG NHẬP"
              variant="primary" 
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <Text style={{ textAlign: 'center', color:'grey' }} onPress={() => router.push('/signup')}>Chưa có tài khoản? Đăng kí ngay</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

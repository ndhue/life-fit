import React from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import { useAuthLoginMutation } from "../controllers/api";

const SignIn = () => {
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
  
  const [authLogin, { isLoading }] = useAuthLoginMutation();

  const onSubmit = async (data) => {
    try {
      const result = await authLogin(data);
      console.log('SignIn successful:', result);
      console.log(data);
      
      router.push('/');
    } catch (error) {
      console.error('SignUp failed:', error);
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
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

            <InputField 
              secure={true}
              label="MẬT KHẨU"
              placeholder="Mật khẩu của bạn"
              onChangeText={text => setValue('password', text)}  
            />
            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            <Text style={{ color:'grey' }}>Quên mật khẩu?</Text>
          </View>
          <View style={{ paddingHorizontal: 70, paddingVertical: 8 }}>
            <LargeButton 
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

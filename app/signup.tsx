import React, { useState } from "react";
import { Text, View } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFormContext } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import { useSignUpMutation } from "../controllers/api";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import Button from "../components/Button";

const SignUp = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePicker();
    }
  }

  const confirmDate = () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}/${month}/${day}`;
    setDateValue(formattedDate)
    toggleDatePicker();
  }

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    fullname: yup.string().required('Full name is required'),
    birthday: yup.string().required('Birthday is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      fullname: "",
      birthday: "",
      password: "",
      confirmPassword: ""
    }
  });

  const [mutate] = useSignUpMutation();
  
  const onSubmit = async (data) => {
    try {
      const result = await mutate(data);
      console.log('SignUp successful:', result);
    } catch (error) {
      console.error('SignUp failed:', error);
    }
  };

  return (
    <View style={[global.container, { backgroundColor: 'white', justifyContent: 'center' }]}>
      <View
        style={{
          width: 393,
          height: 680,
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
          Đăng kí
        </Text>
        <View style={{ padding: 20, paddingBottom: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label='Email'
              placeholder='Tài khoản email của bạn'
            />
            <InputField
              label='Họ và tên'
              placeholder='Họ tên của bạn'
            />
            <InputField
              label='Ngày sinh'
              placeholder='YYYY/MM/DD'
              onPress={toggleDatePicker}
              editable={false}
              value={dateValue}
            />
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
            <InputField
              secure={true}
              label='Mật khẩu'
            />
            <InputField
              secure={true}
              label='Xác nhận mật khẩu'
            />
          </form>
        </View>
        <View style={{ paddingHorizontal: 70, paddingVertical: 8 }}>
          <LargeButton title="ĐĂNG KÍ" variant="primary" />
        </View>
        <Text style={{ textAlign: 'center', color:'grey' }} onPress={() => router.push('/signin')}>Đã có tài khoản? Đăng nhập</Text>
      </View>
    </View>
  );
};

export default SignUp;

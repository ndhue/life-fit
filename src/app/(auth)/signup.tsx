import React, { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { global } from "../../constants/Global";
import Colors from "../../constants/Colors";
import { useSignUpMutation } from "../../controllers/api";
import InputField from "../../components/InputField";
import LargeButton from "../../components/LargeButton";
import Button from "../../components/Button";
import { UserRegister } from "../../types/user";
import moment from "moment";

const SignUp = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [dateValue, setDateValue] = useState("");

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
    const formattedDate = moment(new Date(date)).format('YYYY-MM-DD');
    setDateValue(formattedDate)
    setValue('birthday', formattedDate)
    toggleDatePicker();
  }

  const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
    fullname: yup.string().required('Họ tên không được để trống'),
    birthday: yup.string().required('Ngày sinh không được để trống'),
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
      email: "",
      fullname: "",
      birthday: "",
      password: "",
      confirmpassword: ""
    }
  });

  const [signUp] = useSignUpMutation();
  const [isLoading, setIsloading] = useState(false);
  
  const onSubmit = async (data: UserRegister) => {
    setIsloading(true);
    try {
      const result = await signUp(data);
      if (result?.data) {
        setIsloading(false);
        setTimeout(() => {
          router.push('/account-auth');
        }, 1000);
      }
    } catch (error) {
      setIsloading(false);
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
            height: 780,
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
            <View>
              <InputField
                label='Email'
                placeholder='Tài khoản email của bạn'
                onChangeText={text => setValue('email', text)}
              />
              {errors.email && <Text style={global.error}>{errors.email.message}</Text>}
              <InputField
                label='Họ và tên'
                placeholder='Họ tên của bạn'
                onChangeText={text => setValue('fullname', text)}
              />
              {errors.fullname && <Text style={global.error}>{errors.fullname.message}</Text>}
              <InputField
                label='Ngày sinh'
                placeholder='YYYY-MM-DD'
                onPress={toggleDatePicker}
                // editable={false}   
                // value={dateValue}
                onChangeText={text => setValue('birthday', text)}
              />
              {errors.birthday && <Text style={global.error}>{errors.birthday.message}</Text>}
              {showPicker && <View
                style={{
                  height: 250,
                  top: 100,
                  bottom: 0,
                  margin: 'auto',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  borderRadius: 8,
                  zIndex: 99,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DateTimePicker 
                  style={{
                    height: 180,
                    backgroundColor: 'white'
                  }}
                  textColor="black"
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
                onChangeText={text => setValue('password', text)}
              />
              {errors.password && <Text style={global.error}>{errors.password.message}</Text>}
              <InputField
                secure={true}
                label='Xác nhận mật khẩu'
                onChangeText={text => setValue('confirmpassword', text)}
              />
              {errors.confirmpassword && <Text style={global.error}>{errors.confirmpassword.message}</Text>}
            </View>
          </View>
          <View style={{ paddingHorizontal: 70, paddingVertical: 8 }}>
            <LargeButton
              loading={isLoading} 
              title="ĐĂNG KÍ" 
              variant="primary" 
              onPress={handleSubmit(onSubmit)} />
          </View>
          <Text style={{ textAlign: 'center', color:'grey' }} onPress={() => router.push('/signin')}>Đã có tài khoản? Đăng nhập</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

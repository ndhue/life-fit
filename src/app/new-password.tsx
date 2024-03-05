import React from "react";
import { View } from "react-native";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { global } from "../constants/Global";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import { StyleSheet } from "react-native";
import { useUpdatePasswordMutation } from "../controllers/api";
import { NewPassword } from "../src/types/user";

const UpdatePassword = () => {
  const schema = yup.object().shape({
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
      password: "",
      confirmpassword: ""
    }
  });

  const [updatePassword] = useUpdatePasswordMutation();

  const onSubmit = async (data: NewPassword) => {
    try {
      const result = await updatePassword(data);
      console.log('Send otp successful:', result);
    } catch (error) {
      console.error('Send otp failed:', error);
    }
  }; 

  return (
    <View style={global.wrapper}>
      <View style={global.container}>
      <View style={styles.fixedContainer}>
        <InputField label="Mật khẩu mới" onChangeText={(t) => setValue('password', t)} />
        <InputField label="Xác nhận mật khẩu" onChangeText={(t) => setValue('confirmpassword', t)} />
        <View
          style={[
            global.flexBox,
            { justifyContent: "flex-end", paddingTop: 10 },
          ]}
        >
          <LargeButton title="Gửi" variant="primary" onPress={handleSubmit(onSubmit)} />
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

export default UpdatePassword;

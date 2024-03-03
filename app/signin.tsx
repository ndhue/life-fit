import React from "react";
import { Text, View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";
import LargeButton from "../components/LargeButton";
import { router } from "expo-router";

const SignIn = () => {
  return (
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
          <InputField label="EMAIL" placeholder="Tài khoản email của bạn" />
          <InputField secure={true} label="MẬT KHẨU" placeholder="Mật khẩu của bạn" />
          <Text style={{ color:'grey' }}>Quên mật khẩu?</Text>
        </View>
        <View style={{ paddingHorizontal: 70, paddingVertical: 8 }}><LargeButton title="ĐĂNG NHẬP" variant="primary" /></View>
        <Text style={{ textAlign: 'center', color:'grey' }} onPress={() => router.push('/signup')}>Chưa có tài khoản? Đăng kí ngay</Text>
      </View>
    </View>
  );
};

export default SignIn;

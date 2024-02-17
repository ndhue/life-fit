import React from "react";
import { Text, View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import InputField from "../components/InputField";

const SignIn = () => {
  return (
    <View style={[global.container, { backgroundColor: Colors.background }]}>
      <View
        style={{
          width: 393,
          height: 540,
          borderRadius: 20,
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: "600",
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
        <View style={{ paddingVertical: 20 }}>
          <InputField label="Email" placeholder="Tài khoản email của bạn" />
          <InputField label="Mật khẩu" />
        </View>
      </View>
    </View>
  );
};

export default SignIn;

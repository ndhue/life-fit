import React from "react";
import { View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import InputField from "../components/InputField";

const ForgetPassword = () => {
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
        <InputField label="EMAIL" placeholder="Tài khoản email của bạn" />
        <View style={[global.flexBox, { justifyContent: "flex-end", paddingTop: 10 }]}>
        <Button title="Gửi" variant="primary"/>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

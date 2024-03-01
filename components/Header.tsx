import React from "react";
import { Text, View } from "react-native";
import { global } from "../constants/Styles";

type HeaderProps = {
  icon?: string;
  edit?: boolean;
  title: string;
};

const Header = ({ icon, title, edit }: HeaderProps) => {
  return (
    <View
      style={[
        global.flexBox,
        {
          paddingVertical: 20,
          paddingHorizontal: 10
        },
      ]}
    >
      <svg
        style={{
          width: 36,
          height: 30,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path
          fill="#FFD43B"
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>

      <Text style={global.title}>{title}</Text>
      {edit 
      ? 
        <Text>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{
          width: 25,
          height: 25,
        }}><path fill="#FFD43B" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
        </Text>
      : <Text>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  style={{ width: 25, height: 25 }}><path fill="#FFD43B" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" /></svg>

      </Text>}
    </View>
  );
};

export default Header;

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
          paddingHorizontal: 10,
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
      {edit ? <Text>Edit</Text> : <Text></Text>}
    </View>
  );
};

export default Header;

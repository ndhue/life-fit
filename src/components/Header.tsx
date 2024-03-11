import React from "react";
import { Text, View } from "react-native";
import { global } from "../constants/Global";
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { router } from "expo-router";

type HeaderProps = {
  edit?: boolean;
  title: string;
  route?: string;
  main?: boolean;
};

const Header = ({ main, title, edit, route }: HeaderProps) => {
  return (
    <View
      style={[
        global.flexBox,
        {
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: 20
        },
      ]}
    >
      {main ? <AntDesign name="arrowleft" size={25} color="#FFD43B" onPress={() => router.replace(route)} /> : <View style={{width: 20}}/>}
      <Text style={global.title}>{title}</Text>
      {edit 
      ? 
      <FontAwesome name="pencil" size={25} color="#FFD43B" onPress={() => router.push('/edit-profile')} />
      : <FontAwesome name="bell" size={25} color="#FFD43B" />
      }
    </View>
  );
};

export default Header;

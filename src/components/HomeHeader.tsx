import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { router } from "expo-router";

interface props {
  username: string;
}

const HomeHeader = ({ username }: props) => {
  
  return (
    <View 
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        height: 120,
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 15,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: "gray",
            borderRadius: 100,
          }}
        ></View>
        <View>
          <Text style={{ fontSize: 14 }}>Xin chào</Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            {username || ''}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('/notification')}>
        <FontAwesome name="bell" size={25} color="#FFD43B" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

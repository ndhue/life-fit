import React from "react";
import { Text, View } from "react-native";

const HomeHeader = () => {
  return (
    <View 
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
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
          <Text style={{ fontSize: 14 }}>Chào buổi sáng</Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Antonnia Antonnia
          </Text>
        </View>
      </View>
      <Text>Noti</Text>
    </View>
  );
};

export default HomeHeader;

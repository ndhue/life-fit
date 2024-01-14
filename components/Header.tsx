import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View 
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        padding: "20px"
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        <View
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "gray",
            borderRadius: "100%",
          }}
        ></View>
        <View>
          <Text style={{ fontSize: 14 }}>Good Morning</Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            Antonnia Antonnia
          </Text>
        </View>
      </View>
      <Text>Noti</Text>
    </View>
  );
};

export default Header;

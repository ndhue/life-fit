import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { global } from "../constants/Styles";
import Colors from "../constants/Colors";
import Button from "../components/Button";

const Confirm = () => {
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
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
            }}
          >
            Nhập code
          </Text>
          <View style={[global.flexBox, { paddingVertical: 20 }]}>
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={[global.flexBox, { justifyContent: "flex-end"}]}>
          <Text style={{
            color: "#72a5b6",
            paddingRight: 12,
            fontSize: 15
          }}>40s</Text>
        <Button title="Gửi lại mã" variant="primary" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 20,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  boxTitle: {},
  input: {
    width: 30,
    height: 30,
    borderRadius: 3,
    border: `2px solid ${Colors.border}`,
    backgroundColor: Colors.background2,
    paddingHorizontal: 15
  },
});
export default Confirm;

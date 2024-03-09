import React from "react";
import { Pressable, StyleSheet, Text, ActivityIndicator } from "react-native";
import Colors from "../constants/Colors";

type ButtonProps = {
  onPress?: () => void;
  title: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
};

const LargeButton = ({ onPress, title, variant, disabled, loading }: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={variant === "primary" ? styles.primary : styles.secondary}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.secondary} />
      ) : (
        <Text
          style={variant === "primary" ? styles.text : styles.textSecondary}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primary: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 28,
    backgroundColor: "#FFF1B6",
  },
  secondary: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.secondary,
    shadowColor: "gray",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    color: "#6B6B6B",
    fontSize: 20,
    fontWeight: "400",
  },
  textSecondary: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default LargeButton;

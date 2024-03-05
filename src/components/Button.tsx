import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors';

type ButtonProps = {
  onPress?: () => void;
  title: string;
  variant?: string;
  disabled?: boolean;
}

const Button = ({ onPress, title, variant, disabled }: ButtonProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={variant === "primary" ? styles.primary : styles.secondary}>
      <Text style={variant === "primary" ? styles.text : styles.textSecondary}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.border,
  },
  secondary: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: Colors.secondary,
    shadowColor: "gray",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: '500'
  },
  textSecondary: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500'
  }
})

export default Button
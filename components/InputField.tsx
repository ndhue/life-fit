import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../constants/Colors';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
}

const InputField = ({ label, placeholder, type, value }: InputFieldProps) => {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={'#c8c8c8'} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 7,
    backgroundColor: Colors.background2,
    border: `2px solid ${Colors.border}`,
    paddingHorizontal: 15
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 11,
  },
})

export default InputField
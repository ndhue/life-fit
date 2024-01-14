import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from '../constants/Styles';

type InputFieldProps = {
  label: string;
  type: string;
  value?: string;
}

const InputField = ({ label, type, value }: InputFieldProps) => {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  )
}

export default InputField
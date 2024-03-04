import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import Colors from '../constants/Colors';

type InputFieldProps = {
  label: string;
  subLabel?: string;
  placeholder?: string;
  secure?: boolean;
  value?: string;
  onPress?: () => void;
  editable?: boolean;
  onChangeText?: () => void;
}

const InputField = ({ label, subLabel, placeholder, secure, value, onPress, editable, onChangeText }: InputFieldProps) => {
  const handleTapOutside = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when tapped outside
  };
  
  return (
    <View>
    {Platform.OS === 'ios' || Platform.OS === 'android' ? (
      <TouchableWithoutFeedback onPress={handleTapOutside}>
        <View style={{ paddingVertical: 6 }}>
          <Text style={styles.inputLabel}>
            {label}
            <Text style={styles.subLabel}>{subLabel}</Text>
          </Text>
          <TextInput 
            editable={editable} 
            secureTextEntry={secure} 
            style={styles.input} 
            placeholder={placeholder} 
            placeholderTextColor={'#c8c8c8'} 
            onPressIn={onPress} 
            value={value && value}
            onChangeText={onChangeText}
          />
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View style={{ paddingVertical: 6 }}>
          <Text style={styles.inputLabel}>
            {label}
            <Text style={styles.subLabel}>{subLabel}</Text>
          </Text>
          <TextInput 
            editable={editable} 
            secureTextEntry={secure} 
            style={styles.input} 
            placeholder={placeholder} 
            placeholderTextColor={'#c8c8c8'} 
            onPressIn={onPress} 
            value={value && value}
            onChangeText={onChangeText}
          />
        </View>
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 7,
    backgroundColor: Colors.background2,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingHorizontal: 15
  },
  inputLabel: {
    fontWeight: '600',
    fontSize: 16,
    paddingBottom: 11,
  },
  subLabel: {
    fontWeight: '400',
    fontSize: 12,
    paddingLeft: 3
  }
})

export default InputField
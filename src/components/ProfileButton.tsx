import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

type ProfileButtonProps = {
  onPress?: () => void;
  icon?: React.ReactNode;
  text: string;
}

const ProfileButton = ({ onPress, icon, text }: ProfileButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 330,
    height: 60,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  },
});
export default ProfileButton
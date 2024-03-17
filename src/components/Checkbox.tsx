import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '../constants/Colors';
import { useEditActivityMutation } from '../controllers/api';
import { useAppSelector } from '../redux/store';
import { showToastErrorUpdate, showToastSuccessUpdate } from '../toast/toaster';

interface props {
  activity: Object
}

const Checkbox = ({ activity }: props) => {
  const { token } = useAppSelector(state => state.auth);
  const [isChecked, setIsChecked] = useState(activity.goal !== 0); 

  const [editActivity] = useEditActivityMutation();

  const toggleCheckbox = async () => {
    try {
      const data = {
        name: activity.name,
        goal: !isChecked
      }
      const result = await editActivity({token, id: activity.id, data })
      if (result?.data.message === "Cập nhật thành công") {
        showToastSuccessUpdate();
        setIsChecked(!isChecked); 
      } else {
        showToastErrorUpdate();
      }
    } catch (error) {
      showToastErrorUpdate();
    }
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox} disabled={isChecked}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked && <Ionicons name="checkmark" size={18} color="white" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checked: {
    backgroundColor: Colors.primary,
  },
});

export default Checkbox;

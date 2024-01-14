import { useState } from 'react';
import { Text, View } from 'react-native';
import InputField from '../../components/InputField';
import { styles } from '../../constants/Styles';
import RadioButton from '../../components/RadioButton';

export default function TabProfileScreen() {
  const [selectedOption, setSelectedOption] = useState<string>('Nam');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.flexBox, {
        paddingHorizontal: 10
      }]}>
        <Text>Back</Text>
        <Text style={styles.title}>Hồ sơ của tôi</Text>
        <Text>Edit</Text>
      </View>
      <View style={styles.container}>
      <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "gray",
            borderRadius: 100,
          }}
        ></View>
        <InputField label='Email' type='text' />
        <InputField label='Họ và tên' type='text' />
        <InputField label='Tuổi' type='text' />
        <RadioButton
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
      </View>
    </View>
  );
}

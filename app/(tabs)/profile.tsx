import { useState } from "react";
import { View } from "react-native";
import InputField from "../../components/InputField";
import RadioButton from "../../components/RadioButton";
import { global } from "../../constants/Styles";
import Header from "../../components/Header";

export default function TabProfileScreen() {
  const [selectedOption, setSelectedOption] = useState<string>("Nam");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <View style={global.wrapper}>
      <Header title="Hồ sơ của tôi" />
      <View style={global.container}>
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "gray",
            borderRadius: 100,
          }}
        ></View>
        <View>
          <InputField label="Email" type="text" />
          <InputField label="Họ và tên" type="text" />
          <InputField label="Tuổi" type="text" />
          <RadioButton selectedOption={selectedOption} onSelect={handleSelect} />
        </View>
      </View>
    </View>
  );
}

import { useState } from "react";
import { Text, View } from "react-native";
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
      <Header title="Hồ sơ của tôi" edit={true} />
      <View style={global.container}>
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: "gray",
            borderRadius: 100,
          }}
        ></View>
        <View style={{ marginBottom: 20}}>
          <InputField label="Email" type="text" />
          <InputField label="Họ và tên" type="text" />
          <RadioButton selectedOption={selectedOption} onSelect={handleSelect} />
          <View style={{ width: '30%'}}>
            <InputField label="Tuổi" type="text" />
            <InputField label="Cân nặng" subLabel="(kg)" type="text" />
            <InputField label="Chiều cao" subLabel="(cm)" type="text" />
          </View>
        </View>
      </View>
    </View>
  );
}

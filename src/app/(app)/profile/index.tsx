import { useState } from "react";
import { ImageBackground, View } from "react-native";
import InputField from "../../../components/InputField";
import RadioButton from "../../../components/RadioButton";
import { bg, global } from "../../../constants/Global";
import Header from "../../../components/Header";

export default function TabProfileScreen() {
  const [selectedOption, setSelectedOption] = useState<string>("Nam");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <ImageBackground
      source={bg} 
      style={global.backgroundImage}
      resizeMode='cover'
    >
      <View style={global.wrapper}>
        <Header title="Hồ sơ của tôi" edit={true} route="/" />
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
            <InputField label="Email" />
            <InputField label="Họ và tên" />
            <RadioButton selectedOption={selectedOption} onSelect={handleSelect} />
            <View style={{ width: '30%'}}>
              <InputField label="Tuổi" />
              <InputField label="Cân nặng" subLabel="(kg)" />
              <InputField label="Chiều cao" subLabel="(cm)" />
            </View>
          </View>
        </View>
      </View> 
    </ImageBackground>
  );
}

import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../constants/Styles";

let options: string[] = ["Nam", "Nữ", "Khác"];

type RadioButtonProps = {
  selectedOption: string;
  onSelect: (select: string) => void;
};
const RadioButton = ({ selectedOption, onSelect }: RadioButtonProps) => {
  return (
    <View style={{ paddingVertical: 6, width: 339 }}>
      <Text style={styles.inputLabel}>Giới tính</Text>
      <View style={styles.radioButtonContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
          >
            <View
              style={[
                styles.flexBox,
                {
                  gap: 5,
                },
              ]}
            >
              <View style={styles.radioCheck}>
                <View
                  style={[
                    styles.radioCheck,
                    option === selectedOption && styles.selected,
                  ]}
                />
              </View>
              <Text>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RadioButton;

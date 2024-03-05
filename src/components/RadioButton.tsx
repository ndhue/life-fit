import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { global } from "../constants/Global";
import Colors from "../constants/Colors";

let options: string[] = ["Nam", "Nữ", "Khác"];

type RadioButtonProps = {
  selectedOption: string;
  onSelect: (select: string) => void;
};
const RadioButton = ({ selectedOption, onSelect }: RadioButtonProps) => {
  return (
    <View style={{ paddingVertical: 6, width: 339 }}>
      <Text style={global.inputLabel}>Giới tính</Text>
      <View style={styles.radioButtonContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
          >
            <View
              style={[
                global.flexBox,
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

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 25
  },
  radioCheck: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background2,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    width: 12,
    height: 12,
    backgroundColor: Colors.border
  }
})

export default RadioButton;
